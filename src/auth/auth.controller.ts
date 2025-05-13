import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  login(@Body() loginDto: { username: string; password: string }) {
    const user = this.usersService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (user) {
      return this.authService.login({ id: user.id, username: user.username });
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
