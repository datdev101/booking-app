import { Module } from '@nestjs/common';
import { ConcertServiceController } from './concert-service.controller';
import { ConcertServiceService } from './concert-service.service';

@Module({
  imports: [],
  controllers: [ConcertServiceController],
  providers: [ConcertServiceService],
})
export class ConcertServiceModule {}
