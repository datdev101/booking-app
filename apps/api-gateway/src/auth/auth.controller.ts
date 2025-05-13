import { ILoginReq, ILoginRes, IRegisterReq, IRegisterRes } from '@app/common';
import { RabbitmqService } from '@app/rabbitmq';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { AUTH_MSG_PATTERN, AuthService, Public } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: ClientProxy,
    private readonly rmqService: RabbitmqService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() payload: IRegisterReq) {
    const result = await this.rmqService.sendEvent<IRegisterReq, IRegisterRes>(
      this.authService,
      AUTH_MSG_PATTERN.REGISTER,
      payload,
    );
    return result;
  }

  @Public()
  @Post('login')
  async login(
    @Body() payload: ILoginReq,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.rmqService.sendEvent<ILoginReq, ILoginRes>(
      this.authService,
      AUTH_MSG_PATTERN.LOGIN,
      payload,
    );

    res.cookie('token', result.token, { sameSite: true, httpOnly: true });
    return result;
  }
}
