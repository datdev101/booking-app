import { MESSAGE_PATTERN } from '@app/common';
import { sendEventRmq } from '@app/common/helper';
import {
  IGetAllConcertReq,
  IGetAllConcertRes,
  IGetByIdConcertReq,
  IGetByIdConcertRes,
} from '@app/common/interfaces/concert.interface';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConcertService } from './concert.constant';
import { GetAllConcertReq, GetByIdConcertReq } from './dto/req.dto';
import { GetAllConcertResDto, GetByIdConcertResDataDto } from './dto/res.dto';

@Controller('concerts')
export class ConcertController {
  constructor(
    @Inject(ConcertService) private readonly concertService: ClientProxy,
  ) {}

  @Get()
  async getAll(@Query() query: GetAllConcertReq) {
    const result = await sendEventRmq<IGetAllConcertReq, IGetAllConcertRes>(
      this.concertService,
      MESSAGE_PATTERN.CONCERT.GET_ALL,
      query,
    );
    return new GetAllConcertResDto(result);
  }

  @Get(':id')
  async getById(@Param() { id }: GetByIdConcertReq) {
    const result = await sendEventRmq<IGetByIdConcertReq, IGetByIdConcertRes>(
      this.concertService,
      MESSAGE_PATTERN.CONCERT.GET_BY_ID,
      { id },
    );
    return new GetByIdConcertResDataDto(result);
  }
}
