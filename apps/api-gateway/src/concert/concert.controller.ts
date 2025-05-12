import {
  IGetAllConcertReq,
  IGetAllConcertRes,
} from '@app/common/interfaces/concert.interface';
import { RabbitmqService } from '@app/rabbitmq';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CONCERT_MSG_PATTERN, ConcertService } from './concert.constant';

@Controller('concert')
export class ConcertController {
  constructor(
    @Inject(ConcertService) private readonly concertService: ClientProxy,
    private readonly rmqService: RabbitmqService,
  ) {}

  @Get()
  async getAll(@Query() query: IGetAllConcertReq) {
    const result = await this.rmqService.sendEvent<IGetAllConcertRes>(
      this.concertService,
      CONCERT_MSG_PATTERN.GET_ALL,
      query,
    );
    return result;
  }

  //   @Get(':id')
  //   getById(@Param('id') id: string) {}
}
