import {
  ILoginReq,
  IRegisterReq,
  IVerifyTokenReq,
  MESSAGE_PATTERN,
} from '@app/common';
import { ackRmq } from '@app/common/helper';
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
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(MESSAGE_PATTERN.AUTH.REGISTER)
  register(@Payload() payload: IRegisterReq, @Ctx() context: RmqContext) {
    ackRmq(context);
    return this.authService.register(payload);
  }

  @MessagePattern(MESSAGE_PATTERN.AUTH.LOGIN)
  async login(@Payload() payload: ILoginReq, @Ctx() context: RmqContext) {
    ackRmq(context);
    return this.authService.login(payload);
  }

  @MessagePattern(AUTH_MSG_PATTERN.VERIFY_TOKEN)
  verifyToken(@Payload() payload: IVerifyTokenReq, @Ctx() context: RmqContext) {
    ackRmq(context);
    return this.authService.verifyToken(payload);
  }
}
