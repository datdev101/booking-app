import { throwRpcError } from '@app/common/helper';
import {
  IGetAllConcertReq,
  IGetAllConcertRes,
  IGetAvailableSeatTypeReq,
  IGetAvailableSeatTypeRes,
  IGetByIdConcertReq,
  IGetByIdConcertRes,
  IUpdateAvailableSeatsReq,
  IUpdateAvailableSeatsRes,
} from '@app/common/interfaces/concert.interface';
import { RedisService } from '@app/redis';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import { Concert } from './schemas/concert.schema';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel(Concert.name) private readonly concertModel: Model<Concert>,
    @Inject(RedisService) private readonly redisService: Redis,
  ) {}

  getAll(dto: IGetAllConcertReq) {
    return this.concertModel
      .find(dto)
      .select('_id name date isActive')
      .lean<IGetAllConcertRes['data']>()
      .exec();
  }

  async getById(dto: IGetByIdConcertReq) {
    const concert = await this.concertModel
      .findById(dto.id)
      .select('_id name date isActive seatTypes')
      .lean<IGetByIdConcertRes | null>()
      .exec();
    if (!concert) throwRpcError(new NotFoundException('Concert id not exist'));
    return concert;
  }

  async getAvailableSeats(
    dto: IGetAvailableSeatTypeReq,
  ): Promise<IGetAvailableSeatTypeRes> {
    const { concertId, seatTypeId } = dto;
    const cacheKey = this.getAvailableSeatCacheKey(dto);

    const cachedSeats = await this.redisService.get(cacheKey);
    if (cachedSeats !== null) {
      return { availableSeat: Number(cachedSeats) };
    }

    const concert = await this.concertModel
      .findOne({ _id: concertId, 'seatTypes._id': seatTypeId })
      .select('seatTypes.$')
      .exec();

    if (!concert?.seatTypes?.length) {
      throwRpcError(new BadRequestException('Invalid id'));
    }

    const availableSeat = concert.seatTypes[0].availableSeats;
    await this.redisService.set(cacheKey, availableSeat);

    return { availableSeat };
  }

  async updateAvailableSeats(
    dto: IUpdateAvailableSeatsReq,
  ): Promise<IUpdateAvailableSeatsRes> {
    await this.concertModel.findOneAndUpdate(
      {
        _id: dto.concertId,
        'seatTypes._id': dto.seatTypeId,
      },
      {
        'seatTypes.$.availableSeats': dto.amount,
      },
      {
        new: true,
      },
    );
    await this.redisService.set(this.getAvailableSeatCacheKey(dto), dto.amount);
    return {
      success: true,
    };
  }

  private getAvailableSeatCacheKey(dto: {
    concertId: string;
    seatTypeId: string;
  }) {
    return `concert:${dto.concertId}:seatType:${dto.seatTypeId}`;
  }
}
