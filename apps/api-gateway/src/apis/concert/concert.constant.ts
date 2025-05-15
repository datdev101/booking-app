import { IPattern } from '@app/common';

export const ConcertService = 'ConcertService';

export const CONCERT_MSG_PATTERN = {
  GET_ALL: {
    cmd: 'get-all',
  },
  GET_BY_ID: {
    cmd: 'get-by-id',
  },
} satisfies Record<string, IPattern>;
