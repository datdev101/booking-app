import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: ClientProxy) {}

  @Get()
  async test() {
    const result = await lastValueFrom(
      this.authService.send('auth', { msg: 'this is api gateway' }),
    );
    return result;
  }
}
