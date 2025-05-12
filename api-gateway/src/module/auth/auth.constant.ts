import { IPattern } from 'src/core/common/interface';

export const AuthService = 'AuthService';

export const AUTH_MSG_PATTERN = {
  REGISTER: {
    cmd: 'register',
  },
  LOGIN: {
    cmd: 'login',
  },
} satisfies Record<string, IPattern>;
