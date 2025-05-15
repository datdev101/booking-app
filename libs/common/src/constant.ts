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
} satisfies Record<string, Record<string, IPattern>>;
