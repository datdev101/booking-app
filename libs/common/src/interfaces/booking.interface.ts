export interface ICreateBookingReq {
  userId: string;
  concertId: string;
  seatTypeId: string;
}

export interface ICreateBookingRes {
  _id: string;
  userId: string;
  concertId: string;
  seatTypeId: string;
  seatType: 'vip' | 'regular' | 'standing';
  price: number;
  status: 'confirm' | 'cancel';
  cancelAt: Date | null;
}
