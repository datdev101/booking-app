import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_MSG_PATTERN } from './auth.constant';

@Controller('auth')
export class AuthController {
  @MessagePattern(AUTH_MSG_PATTERN.AUTH)
  test() {
    return {
      msg: 'This is auth service',
    };
  }
}
