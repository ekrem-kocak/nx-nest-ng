// apps/api/src/auth/strategies/jwt-refresh.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.rt]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshSecret'),
    });
  }

  async validate(req: Request) {
    const refreshToken = req.cookies?.rt;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const [jti, raw] = refreshToken.split('.');
    if (!jti || !raw) {
      throw new UnauthorizedException('Invalid refresh token format');
    }

    const tokenRecord = await this.authService.validateRefreshToken(jti, raw);
    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return { id: tokenRecord.userId, refreshToken };
  }
}
