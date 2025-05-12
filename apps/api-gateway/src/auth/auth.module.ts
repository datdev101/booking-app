import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.constant';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    RabbitmqModule.register({
      queue: 'auth',
      service: AuthService,
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
