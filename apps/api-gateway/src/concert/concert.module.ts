import { RabbitmqModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { ConcertService } from './concert.constant';
import { ConcertController } from './concert.controller';

@Module({
  controllers: [ConcertController],
  imports: [
    RabbitmqModule.register({
      queue: 'concert',
      service: ConcertService,
    }),
  ],
})
export class ConcertModule {}
