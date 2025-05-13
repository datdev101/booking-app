import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SeatType {
  @Prop({ required: true, enum: ['vip', 'regular', 'standing'] })
  type: 'vip' | 'regular' | 'standing';

  @Prop({ required: true })
  totalSeats: number;

  @Prop({ required: true })
  availableSeats: number;
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatType);
