import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SeatType, SeatTypeSchema } from './seat-type.schema';

@Schema({ timestamps: true })
export class Concert extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: [SeatTypeSchema], default: [] })
  seatTypes: SeatType[];

  @Virtual({
    get: function (this: Concert) {
      return this._id;
    },
  })
  concertId: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
