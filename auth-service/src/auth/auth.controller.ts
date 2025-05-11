import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  @MessagePattern('auth')
  test(@Payload() payload: any) {
    return {
      msg: 'This is auth service',
    };
  }
}
