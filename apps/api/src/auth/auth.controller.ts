import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse, AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@ApiTags('Authentication') // Swagger'da 'Authentication' grubu oluşturur
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: SignupUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully and tokens returned.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email address already in use (Conflict).',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data (Validation Error).',
  })
  async signUp(@Body() signupUserDto: SignupUserDto): Promise<AuthResponse> {
    return this.authService.signUp(signupUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful and tokens returned.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password (Unauthorized).',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data (Validation Error).',
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(loginUserDto);
  }
}
