import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.constant';
import { BookingController } from './booking.controller';

@Module({
  controllers: [BookingController],
  imports: [
    RabbitmqModule.register({
      queue: 'booking',
      service: BookingService,
    }),
  ],
})
export class BookingModule {}
