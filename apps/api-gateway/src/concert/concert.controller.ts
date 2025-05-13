import {
  IGetAllConcertReq,
  IGetAllConcertRes,
  IGetByIdConcertReq,
  IGetByIdConcertRes,
} from '@app/common/interfaces/concert.interface';
import { RabbitmqService } from '@app/rabbitmq';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
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
    const result = await this.rmqService.sendEvent<
      IGetAllConcertReq,
      IGetAllConcertRes
    >(this.concertService, CONCERT_MSG_PATTERN.GET_ALL, query);
    return result;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.rmqService.sendEvent<
      IGetByIdConcertReq,
      IGetByIdConcertRes
    >(this.concertService, CONCERT_MSG_PATTERN.GET_BY_ID, { id });
    return result;
  }
}
