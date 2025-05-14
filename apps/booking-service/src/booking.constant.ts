import { IPattern } from '@app/common';

export const BOOKING_MSG_PATTERN = {
  CREATE_BOOKING: {
    cmd: 'create-booking',
  },
} satisfies Record<string, IPattern>;

export const CONCERT_MSG_PATTERN = {
  GET_AVAILABLE_SEATS: {
    cmd: 'get-available-seats',
  },
  UPDATE_AVAILABLE_SEATS: {
    cmd: 'update-available-seats',
  },
} satisfies Record<string, IPattern>;
