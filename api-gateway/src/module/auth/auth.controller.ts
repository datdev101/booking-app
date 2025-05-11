import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { sendEvent } from 'src/core/common/helper';
import { AuthService } from './auth.constant';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: ClientProxy) {}

  @Get()
  @ApiOkResponse()
  async test() {
    const result = await sendEvent<{ msg: string }>(
      this.authService,
      { cmd: 'auth' },
      { msg: 'this is api-gateway' },
    );
    return result;
  }
}
