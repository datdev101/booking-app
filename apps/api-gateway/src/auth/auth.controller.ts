import { IRegisterReq, IRegisterRes } from '@app/common';
import { RabbitmqService } from '@app/rabbitmq';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_MSG_PATTERN, AuthService } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: ClientProxy,
    private readonly rmqService: RabbitmqService,
  ) {}

  @Post('register')
  async register(@Body() payload: IRegisterReq) {
    const result = await this.rmqService.sendEvent<IRegisterRes>(
      this.authService,
      AUTH_MSG_PATTERN.REGISTER,
      payload,
    );
    return result;
  }
}
