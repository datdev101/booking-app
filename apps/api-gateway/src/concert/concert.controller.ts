import { sendEventRmq } from '@app/common/helper';
import {
  IGetAllConcertReq,
  IGetAllConcertRes,
  IGetByIdConcertReq,
  IGetByIdConcertRes,
} from '@app/common/interfaces/concert.interface';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CONCERT_MSG_PATTERN, ConcertService } from './concert.constant';
import { GetAllConcertReq, GetByIdConcertReq } from './dto/req.dto';

@Controller('concerts')
export class ConcertController {
  constructor(
    @Inject(ConcertService) private readonly concertService: ClientProxy,
  ) {}

  @Get()
  async getAll(@Query() query: GetAllConcertReq) {
    const result = await sendEventRmq<IGetAllConcertReq, IGetAllConcertRes>(
      this.concertService,
      CONCERT_MSG_PATTERN.GET_ALL,
      query,
    );
    return result;
  }

  @Get(':id')
  async getById(@Param() { id }: GetByIdConcertReq) {
    const result = await sendEventRmq<IGetByIdConcertReq, IGetByIdConcertRes>(
      this.concertService,
      CONCERT_MSG_PATTERN.GET_BY_ID,
      { id },
    );
    return result;
  }
}
