import { AppConfigModule } from '@app/app-config';
import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { EnvVar } from './config/env';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/auth-service/.env'),
      cls: EnvVar,
    }),
    RabbitmqModule,
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
