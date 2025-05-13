import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly concertModel: Model<Booking>,
  ) {}

  createBooking() {
    // check user duplicate book concert
    // check user booking too much
  }
}
