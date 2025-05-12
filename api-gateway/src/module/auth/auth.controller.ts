import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendEvent } from 'src/core/common/helper';
import { AUTH_MSG_PATTERN, AuthService, Public } from './auth.constant';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: ClientProxy) {}

  @Post('register')
  @ApiOkResponse()
  @Public()
  async register(@Body() payload: unknown) {
    return sendEvent<{ code: number; msg: string }>(
      this.authService,
      AUTH_MSG_PATTERN.REGISTER,
      payload,
    );
  }

  @Post('login')
  @ApiOkResponse()
  @Public()
  async login(
    @Body() payload: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await sendEvent<{
      code: number;
      msg: string;
      data: { token: string };
    }>(this.authService, AUTH_MSG_PATTERN.LOGIN, payload);

    res.cookie('token', result.data.token, { sameSite: true, httpOnly: true });
    return {
      code: result.code,
      message: result.msg,
    };
  }
}
