import { IPattern } from './interfaces';

export const MESSAGE_PATTERN = {
  AUTH: {
    REGISTER: {
      cmd: 'register-user',
    },
    LOGIN: {
      cmd: 'login-user',
    },
    VERIFY_TOKEN: {
      cmd: 'verify-token',
    },
  },
  CONCERT: {
    GET_ALL: {
      cmd: 'get-all-concert',
    },
    GET_BY_ID: {
      cmd: 'get-concert-by-id',
    },
    GET_AVAILABLE_SEATS: {
      cmd: 'get-available-seats-in-seat-type-of-concert',
    },
    UPDATE_AVAILABLE_SEATS: {
      cmd: 'update-available-seats-in-seat-type-of-concert',
    },
  },
} satisfies Record<string, Record<string, IPattern>>;
