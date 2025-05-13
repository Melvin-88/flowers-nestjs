import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface UserPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: UserPayload) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
