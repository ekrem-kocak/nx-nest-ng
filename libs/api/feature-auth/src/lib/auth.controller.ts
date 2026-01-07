// apps/api/src/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInUserDto, SignUpUserDto } from '@nx-nest-ng/dto';
import { Request, Response } from 'express';
import { AuthResponse, AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: SignUpUserDto })
  async signUp(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: SignUpUserDto,
  ) {
    const { accessToken, cookie } = await this.authService.signUp(
      dto.email,
      dto.password,
      req.headers['user-agent'],
      req.ip,
    );

    this.setRefreshCookie(res, cookie.value);
    return { accessToken };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SignInUserDto })
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: SignInUserDto,
  ) {
    const { accessToken, cookie } = await this.authService.signIn(
      dto.email,
      dto.password,
      req.headers['user-agent'],
      req.ip,
    );
    this.setRefreshCookie(res, cookie.value);
    return { accessToken };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Req() req: Request): Promise<AuthResponse> {
    return this.authService.refreshToken(
      req.cookies.rt,
      req.headers['user-agent'],
      req.ip,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  async logout(@Req() req: Request): Promise<void> {
    const refreshToken = req.cookies?.rt;
    return this.authService.logout(refreshToken);
  }

  private setRefreshCookie(res: Response, value: string) {
    res.cookie('rt', value, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
