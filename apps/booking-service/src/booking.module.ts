import { AppConfigModule, AppConfigService } from '@app/app-config';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { EnvVar } from './config/env';
import { Booking, BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/booking-service/.env'),
      cls: EnvVar,
    }),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        uri: appConfig.get('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    RedisModule.register(),
    ClientsModule.registerAsync([
      {
        name: 'ConcertService',
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (appConfig: AppConfigService<EnvVar>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [appConfig.get<string>('RABBIT_MQ_URI')],
            queue: appConfig.get('RABBIT_MQ_CONCERT_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
