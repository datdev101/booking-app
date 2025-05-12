import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_MSG_PATTERN } from './auth.constant';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_MSG_PATTERN.REGISTER)
  register(@Payload() payload: { email: string; password: string }) {
    return this.authService.register(payload);
  }
}
