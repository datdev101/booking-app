import { Controller, Get } from '@nestjs/common';
import { ConcertServiceService } from './concert-service.service';

@Controller()
export class ConcertServiceController {
  constructor(private readonly concertServiceService: ConcertServiceService) {}

  @Get()
  getHello(): string {
    return this.concertServiceService.getHello();
  }
}
