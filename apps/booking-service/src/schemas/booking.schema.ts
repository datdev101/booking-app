import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  concertId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  seatTypeId: Types.ObjectId;

  @Prop({ enum: ['confirmed', 'canceled'] })
  status: 'confirmed' | 'canceled';

  @Prop({ type: Date, default: null })
  cancelAt: Date | null;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
