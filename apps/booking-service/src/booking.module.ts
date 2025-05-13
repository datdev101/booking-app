import { AppConfigModule, AppConfigService } from '@app/app-config';
import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
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
    RabbitmqModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        uri: appConfig.get('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
