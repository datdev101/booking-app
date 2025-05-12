import { RabbitmqService } from '@app/rabbitmq';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AuthServiceService } from './auth-service.service';

@Controller()
export class AuthServiceController {
  constructor(
    private readonly authService: AuthServiceService,
    private readonly rmqService: RabbitmqService,
  ) {}

  @MessagePattern({ cmd: 'auth' })
  getHello(@Payload() payload, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);

    return {
      msg: 'this is auth service',
    };
  }
}
