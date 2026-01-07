import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@nx-nest-ng/api-core';
import { UsersService } from '@nx-nest-ng/api-feature-users';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

// Define the response interface for the auth service
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  cookie: {
    name: string;
    value: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(email: string, password: string, ua?: string, ip?: string) {
    const exists = await this.usersService.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');

    const bcryptRounds = this.configService.get('security.bcryptRounds') || 10;
    const hash = await bcrypt.hash(password, bcryptRounds);
    const user = await this.usersService.create({ email, password: hash });

    const accessToken = await this.createAccessToken(user.id, user.email);
    const { refreshToken, cookie } = await this.issueRefreshToken(
      user.id,
      ua,
      ip,
    );

    return { accessToken, refreshToken, cookie };
  }

  async signIn(email: string, password: string, ua?: string, ip?: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.createAccessToken(user.id, user.email);
    const { refreshToken, cookie } = await this.issueRefreshToken(
      user.id,
      ua,
      ip,
    );

    return { accessToken, refreshToken, cookie };
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) return;
    const [jti] = refreshToken.split('.');
    if (!jti) return;
    await this.prismaService.refreshToken.update({
      where: { jti },
      data: { revokedAt: new Date() },
    });
  }

  async logoutAll(userId: string) {
    await this.prismaService.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async validateRefreshToken(jti: string, raw: string) {
    return this.validateTokenRecord(jti, raw);
  }

  async refreshToken(
    refreshToken: string,
    userAgent?: string,
    ip?: string,
  ): Promise<AuthResponse> {
    return this.rotateRefreshToken(refreshToken, userAgent, ip);
  }

  // Issue a new refresh token
  private async issueRefreshToken(
    userId: string,
    userAgent?: string,
    ip?: string,
  ) {
    const jti = randomUUID();
    const raw = randomUUID() + '.' + randomUUID();
    const hash = await bcrypt.hash(raw, 10);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    await this.prismaService.refreshToken.create({
      data: {
        userId,
        jti,
        tokenHash: hash,
        userAgent,
        ip,
        expiresAt,
      },
    });

    return {
      refreshToken: `${jti}.${raw}`,
      cookie: {
        name: 'rt',
        value: `${jti}.${raw}`,
      },
    };
  }

  private async createAccessToken(userId: string, email: string) {
    return this.jwtService.signAsync({
      sub: userId,
      email: email,
    });
  }

  private async rotateRefreshToken(
    token: string,
    ua?: string,
    ip?: string,
  ): Promise<AuthResponse> {
    const [jti, raw] = token.split('.');
    if (!jti || !raw) throw new UnauthorizedException('Invalid refresh token');

    const found = await this.validateTokenRecord(jti, raw);
    if (!found)
      throw new UnauthorizedException('Invalid or expired refresh token');

    // Revoke old token
    await this.prismaService.refreshToken.update({
      where: { jti },
      data: { revokedAt: new Date() },
    });

    // Issue new token
    const { refreshToken, cookie } = await this.issueRefreshToken(
      found.userId,
      ua,
      ip,
    );
    const user = await this.usersService.findById(found.userId);
    if (!user) throw new UnauthorizedException('User not found');

    const accessToken = await this.createAccessToken(found.userId, user.email);
    return { accessToken, refreshToken, cookie };
  }

  private async validateTokenRecord(jti: string, raw: string) {
    const found = await this.prismaService.refreshToken.findUnique({
      where: { jti },
    });

    if (!found || found.revokedAt || found.expiresAt < new Date()) {
      return null;
    }

    const isValid = await bcrypt.compare(raw, found.tokenHash);
    return isValid ? found : null;
  }
}
