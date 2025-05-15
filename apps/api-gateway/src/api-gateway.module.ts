import { AppConfigModule } from '@app/app-config';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { AuthModule } from './apis/auth/auth.module';
import { BookingModule } from './apis/booking/booking.module';
import { ConcertModule } from './apis/concert/concert.module';
import { EnvVar } from './config/env';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/api-gateway/.env'),
      cls: EnvVar,
    }),
    AuthModule,
    ConcertModule,
    BookingModule,
  ],
})
export class ApiGatewayModule {}
