import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    RabbitmqModule.register({
      queue: 'auth',
      service: AuthService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard],
})
export class AuthModule {}
