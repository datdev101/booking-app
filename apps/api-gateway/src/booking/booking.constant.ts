import { IPattern } from '@app/common';

export const BookingService = 'BookingService';

export const BOOKING_MSG_PATTERN = {
  CREATE_BOOKING: {
    cmd: 'create-booking',
  },
} satisfies Record<string, IPattern>;
