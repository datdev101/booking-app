import { MESSAGE_PATTERN } from '@app/common';
import { ackRmq } from '@app/common/helper';
import {
  IGetAllConcertReq,
  IGetAllConcertRes,
  IGetAvailableSeatsReq,
  IGetByIdConcertReq,
  IGetByIdConcertRes,
  IUpdateAvailableSeatsReq,
} from '@app/common/interfaces/concert.interface';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ConcertService } from './concert.service';

@Controller()
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @MessagePattern(MESSAGE_PATTERN.CONCERT.GET_ALL)
  async getAll(
    @Payload() payload: IGetAllConcertReq,
    @Ctx() context: RmqContext,
  ): Promise<IGetAllConcertRes> {
    ackRmq(context);
    const concerts = await this.concertService.getAll(payload);
    return {
      data: concerts,
    };
  }

  @MessagePattern(MESSAGE_PATTERN.CONCERT.GET_BY_ID)
  getById(
    @Payload() payload: IGetByIdConcertReq,
    @Ctx() context: RmqContext,
  ): Promise<IGetByIdConcertRes | null> {
    ackRmq(context);
    return this.concertService.getById(payload);
  }

  @MessagePattern(MESSAGE_PATTERN.CONCERT.GET_AVAILABLE_SEATS)
  getAvailableSeats(
    @Payload() payload: IGetAvailableSeatsReq,
    @Ctx() context: RmqContext,
  ) {
    ackRmq(context);
    return this.concertService.getAvailableSeats(payload);
  }

  @MessagePattern(MESSAGE_PATTERN.CONCERT.UPDATE_AVAILABLE_SEATS)
  updateAvailableSeats(
    @Payload() payload: IUpdateAvailableSeatsReq,
    @Ctx() context: RmqContext,
  ) {
    ackRmq(context);
    return this.concertService.updateAvailableSeats(payload);
  }
}
