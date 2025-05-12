import { IRegisterReq } from '@app/common';
import { RabbitmqService } from '@app/rabbitmq';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AUTH_MSG_PATTERN } from './auth.constant';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RabbitmqService,
  ) {}

  @MessagePattern(AUTH_MSG_PATTERN.REGISTER)
  register(@Payload() payload: IRegisterReq, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);

    return this.authService.register(payload);
  }
}
