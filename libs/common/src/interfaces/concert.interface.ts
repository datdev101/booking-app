export interface IGetAllConcertReq {
  isActive?: boolean;
}

export interface IGetAllConcertRes {
  data: {
    id: string;
    name: string;
    date: Date;
    isActivated: boolean;
  }[];
}

export interface IGetByIdConcertReq {
  id: string;
}

export interface IGetByIdConcertRes {
  id: string;
  name: string;
  date: Date;
  isActivated: boolean;
  seatTypes: [
    {
      type: string;
      totalTickets: number;
      remainingTickets: number;
    },
  ];
}

export interface IGetAvailableSeatsReq {
  concertId: string;
  seatTypeId: string;
}

export interface IUpdateAvailableSeatsReq {
  concertId: string;
  seatTypeId: string;
}
