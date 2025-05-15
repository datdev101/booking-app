import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

import { IVerifyTokenReq, IVerifyTokenRes, MESSAGE_PATTERN } from '@app/common';
import { sendEventRmq } from '@app/common/helper';
import { AuthService, IS_PUBLIC_KEY } from './auth.constant';
import { AuthRequest } from './auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AuthService) private readonly authService: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = request.cookies?.token as string | undefined;
    if (!token) throw new UnauthorizedException('Missing token');

    const { user: authUser } = await sendEventRmq<
      IVerifyTokenReq,
      IVerifyTokenRes
    >(this.authService, MESSAGE_PATTERN.AUTH.VERIFY_TOKEN, { token });
    // const isInBlackList = !!(await this.cacheService.cache.get(
    //   getAuthCacheKey(token),
    // ));

    // if (isInBlackList) throw new UnauthorizedException(AUTH_ERROR.UNAUTHORIZED);

    request.user = {
      email: authUser.email,
      id: authUser.id,
    };
    return true;
  }
}
