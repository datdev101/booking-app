import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_MSG_PATTERN } from './auth.constant';
import { AuthService } from './auth.service';
import { IRegisterUser } from './interfaces/register-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_MSG_PATTERN.REGISTER)
  async register(
    @Payload() payload: { email: string; password: string },
  ): Promise<IRegisterUser> {
    const result = await this.authService.register(payload);
    return {
      id: result._id.toString(),
      email: result.email,
    };
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
