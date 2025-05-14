import { IPattern } from '@app/common';

export const CONCERT_MSG_PATTERN = {
  GET_ALL: {
    cmd: 'get-all',
  },
  GET_BY_ID: {
    cmd: 'get-by-id',
  },
  GET_AVAILABLE_SEATS: {
    cmd: 'get-available-seats',
  },
} satisfies Record<string, IPattern>;
