import { IPattern } from 'src/common/interface';

export const AUTH_MSG_PATTERN = {
  AUTH: {
    cmd: 'auth',
  },
} satisfies Record<string, IPattern>;
