import { throwRpcError } from '@app/common/helper';
import {
  IGetAllConcertReq,
  IGetAllConcertRes,
  IGetByIdConcertReq,
  IGetByIdConcertRes,
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

  async getAvailableSeats(dto: { concertId: string; seatTypeId: string }) {
    const key = `concert:${dto.concertId}:seatType:${dto.seatTypeId}`;
    const availableSeats = await this.redisService.get(key);

    if (availableSeats !== null) return Number(availableSeats);

    const result = await this.concertModel
      .findOne({
        _id: dto.concertId,
        'seatTypes._id': dto.seatTypeId,
      })
      .select('seatTypes.$')
      .exec();

    if (result == null || result.seatTypes.length == 0) {
      throwRpcError(new BadRequestException('Invalid id'));
    }

    const seats = result.seatTypes[0].availableSeats;
    await this.redisService.set(key, seats);

    return seats;
  }

  async updateAvailableSeats(dto: { concertId: string; seatTypeId: string }) {
    return this.concertModel.findOneAndUpdate(
      {
        _id: dto.concertId,
        'seatTypes._id': dto.seatTypeId,
      },
      {
        $inc: { 'seatTypes.$.availableSeats': -1 },
      },
    );
  }
}
