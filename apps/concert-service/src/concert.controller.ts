import {
  IGetAllConcertReq,
  IGetAvailableSeatsReq,
  IGetByIdConcertReq,
} from '@app/common/interfaces/concert.interface';
import { RabbitmqService } from '@app/rabbitmq';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CONCERT_MSG_PATTERN } from './concert.constant';
import { ConcertService } from './concert.service';

@Controller()
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly rmqService: RabbitmqService,
  ) {}

  @MessagePattern(CONCERT_MSG_PATTERN.GET_ALL)
  getAll(@Payload() payload: IGetAllConcertReq, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.concertService.getAll(payload);
  }

  @MessagePattern(CONCERT_MSG_PATTERN.GET_BY_ID)
  getById(@Payload() payload: IGetByIdConcertReq, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.concertService.getById(payload);
  }

  @MessagePattern(CONCERT_MSG_PATTERN.GET_AVAILABLE_SEATS)
  getAvailableSeats(
    @Payload() payload: IGetAvailableSeatsReq,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return this.concertService.getAvailableSeats(payload);
  }
}
