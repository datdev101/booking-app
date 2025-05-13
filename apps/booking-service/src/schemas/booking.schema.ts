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

  @Prop()
  seatType: 'vip' | 'regular' | 'standing';

  @Prop({ type: Number })
  price: number;

  @Prop()
  status: 'confirmed' | 'cancel';

  @Prop({ type: Date, default: null })
  cancelAt: Date | null;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
