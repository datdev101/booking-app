import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SeatType, SeatTypeSchema } from './seat-type.schema';

@Schema({ timestamps: true })
export class Concert extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop({ type: [SeatTypeSchema], default: [] })
  seatTypes: SeatType[];
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
