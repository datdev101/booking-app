import { IPattern } from '@app/common';

export const AUTH_MSG_PATTERN = {
  REGISTER: {
    cmd: 'register',
  },
  LOGIN: {
    cmd: 'login',
  },
  VERIFY_TOKEN: {
    cmd: 'verify-token',
  },
} satisfies Record<string, IPattern>;
