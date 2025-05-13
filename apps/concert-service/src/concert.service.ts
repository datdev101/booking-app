import {
  IGetAllConcertReq,
  IGetByIdConcertReq,
} from '@app/common/interfaces/concert.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert } from './schemas/concert.schema';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel(Concert.name) private readonly concertModel: Model<Concert>,
  ) {}

  async test() {
    const concerts = [
      {
        name: 'Rock Fest 2025',
        date: '2025-08-15T19:00:00.000Z',
        isActivated: true,
        seatTypes: [
          { type: 'vip', price: 150, totalTickets: 50 },
          { type: 'regular', price: 80, totalTickets: 200 },
        ],
      },
      {
        name: 'Jazz Night',
        date: '2025-06-20T20:30:00.000Z',
        isActivated: false,
        seatTypes: [
          { type: 'vip', price: 120, totalTickets: 40 },
          { type: 'standing', price: 60, totalTickets: 150 },
        ],
      },
      {
        name: 'EDM Summer Bash',
        date: '2025-07-04T22:00:00.000Z',
        isActivated: true,
        seatTypes: [{ type: 'standing', price: 90, totalTickets: 500 }],
      },
      {
        name: 'Symphony in the Park',
        date: '2025-09-10T18:00:00.000Z',
        isActivated: true,
        seatTypes: [{ type: 'regular', price: 50, totalTickets: 300 }],
      },
      {
        name: 'Hip Hop Takeover',
        date: '2025-10-01T21:00:00.000Z',
        isActivated: false,
        seatTypes: [
          { type: 'vip', price: 200, totalTickets: 100 },
          { type: 'regular', price: 100, totalTickets: 250 },
          { type: 'standing', price: 70, totalTickets: 400 },
        ],
      },
      {
        name: 'Acoustic Evenings',
        date: '2025-05-25T19:00:00.000Z',
        isActivated: true,
        seatTypes: [{ type: 'regular', price: 60, totalTickets: 150 }],
      },
      {
        name: 'Pop Stars Live',
        date: '2025-11-12T20:00:00.000Z',
        isActivated: false,
        seatTypes: [
          { type: 'vip', price: 180, totalTickets: 80 },
          { type: 'standing', price: 90, totalTickets: 350 },
        ],
      },
      {
        name: 'Country Music Gala',
        date: '2025-08-01T17:30:00.000Z',
        isActivated: true,
        seatTypes: [
          { type: 'regular', price: 70, totalTickets: 200 },
          { type: 'vip', price: 130, totalTickets: 50 },
        ],
      },
      {
        name: 'Metal Mayhem',
        date: '2025-12-05T21:30:00.000Z',
        isActivated: false,
        seatTypes: [{ type: 'standing', price: 100, totalTickets: 300 }],
      },
      {
        name: 'Latin Fiesta',
        date: '2025-07-16T20:00:00.000Z',
        isActivated: true,
        seatTypes: [
          { type: 'vip', price: 140, totalTickets: 60 },
          { type: 'regular', price: 90, totalTickets: 250 },
        ],
      },
    ];

    return await this.concertModel.create(concerts);
  }

  getAll(dto: IGetAllConcertReq) {
    return this.concertModel
      .find(dto)
      .select('_id name date isActivated')
      .exec();
  }

  getById(dto: IGetByIdConcertReq) {
    return this.concertModel
      .findById(dto.id)
      .select('_id name date isActivated seatTypes')
      .exec();
  }
}
