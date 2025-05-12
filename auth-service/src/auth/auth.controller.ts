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

  @MessagePattern(AUTH_MSG_PATTERN.LOGIN)
  async login(
    @Payload() payload: { email: string; password: string },
  ): Promise<{ code: number; msg: string; data: { token: string } }> {
    return {
      code: 200,
      msg: 'Login success',
      data: await this.authService.login(payload),
    };
  }

  @MessagePattern(AUTH_MSG_PATTERN.VERIFY_TOKEN)
  verifyToken(@Payload() payload: { token: string }) {
    return this.authService.validateToken(payload.token);
  }
}
