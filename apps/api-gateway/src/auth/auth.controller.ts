import { RabbitmqService } from '@app/rabbitmq';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: ClientProxy,
    private readonly rmqService: RabbitmqService,
  ) {}

  @Get()
  async test() {
    const result = await this.rmqService.sendEvent(
      this.authService,
      { cmd: 'auth' },
      { msg: 'this is api-gateway' },
    );
    return result;
  }
}
