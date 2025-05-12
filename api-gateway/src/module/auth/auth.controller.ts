import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { sendEvent } from 'src/core/common/helper';
import { AUTH_MSG_PATTERN, AuthService } from './auth.constant';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: ClientProxy) {}

  @Post('register')
  @ApiOkResponse()
  async register(@Body() payload: unknown) {
    return sendEvent<{ code: number; msg: string }>(
      this.authService,
      AUTH_MSG_PATTERN.REGISTER,
      payload,
    );
  }

  @Post('login')
  @ApiOkResponse()
  async login(@Body() payload: unknown) {
    return sendEvent<{ code: number; msg: string; data: { token: string } }>(
      this.authService,
      AUTH_MSG_PATTERN.LOGIN,
      payload,
    );
  }
}
