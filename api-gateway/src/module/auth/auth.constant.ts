import { SetMetadata } from '@nestjs/common';
import { IPattern } from 'src/core/common/interface';

export const AuthService = 'AuthService';

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

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
