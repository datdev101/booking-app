export interface IGetAllConcertReq {
  isActive?: boolean;
}

export interface IGetAllConcertRes {
  data: {
    _id: string;
    name: string;
    date: Date;
    isActive: boolean;
  }[];
}

export interface IGetByIdConcertReq {
  id: string;
}

export interface IGetByIdConcertRes {
  _id: string;
  name: string;
  date: Date;
  isActive: boolean;
  seatTypes: [
    {
      type: 'vip' | 'regular' | 'standing';
      totalSeats: number;
      availableSeats: number;
      _id: string;
    },
  ];
}

export interface IGetAvailableSeatTypeReq {
  concertId: string;
  seatTypeId: string;
}

export interface IGetAvailableSeatTypeRes {
  availableSeat: number;
}

export interface IUpdateAvailableSeatsReq {
  concertId: string;
  seatTypeId: string;
  amount: number;
}

export interface IUpdateAvailableSeatsRes {
  success: boolean;
}
