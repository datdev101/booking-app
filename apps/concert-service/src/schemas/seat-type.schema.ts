import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class SeatType {
  @Prop({ required: true, enum: ['vip', 'regular', 'standing'] })
  type: 'vip' | 'regular' | 'standing';

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalTickets: number;
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatType);
