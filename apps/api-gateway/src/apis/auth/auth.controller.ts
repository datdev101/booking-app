import {
  ILoginReq,
  ILoginRes,
  IRegisterReq,
  IRegisterRes,
  MESSAGE_PATTERN,
} from '@app/common';
import { sendEventRmq } from '@app/common/helper';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Response } from 'express';
import { AuthService, Public } from './auth.constant';
import { LoginReqDto, RegisterReqDto } from './dto/req.dto';
import { LoginResDto, RegisterResDto } from './dto/res.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: ClientProxy) {}

  @Public()
  @Post('register')
  async register(@Body() payload: RegisterReqDto) {
    await sendEventRmq<IRegisterReq, IRegisterRes>(
      this.authService,
      MESSAGE_PATTERN.AUTH.REGISTER,
      payload,
    );
    return new RegisterResDto();
  }

  @Public()
  @Post('login')
  async login(
    @Body() payload: LoginReqDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await sendEventRmq<ILoginReq, ILoginRes>(
      this.authService,
      MESSAGE_PATTERN.AUTH.LOGIN,
      payload,
    );

    res.cookie('token', result.token, { sameSite: true, httpOnly: true });
    return new LoginResDto();
  }
}
