import { AppConfigModule, AppConfigService } from '@app/app-config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvVar } from '../../config/env';
import { BookingService } from './booking.constant';
import { BookingController } from './booking.controller';

@Module({
  controllers: [BookingController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: BookingService,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (appConfig: AppConfigService<EnvVar>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [appConfig.get<string>('RABBIT_MQ_URI')],
            queue: appConfig.get('RABBIT_MQ_BOOKING_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class BookingModule {}
