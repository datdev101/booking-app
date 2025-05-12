import { AppConfigModule } from '@app/app-config';
import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { EnvVar } from './config/env';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/booking-service/.env'),
      cls: EnvVar,
    }),
    RabbitmqModule,
  ],
})
export class BookingModule {}
