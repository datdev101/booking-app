import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { sendEvent } from 'src/core/common/helper';
import { AUTH_MSG_PATTERN, AuthService, IS_PUBLIC_KEY } from './auth.constant';
import { AuthRequest } from './interfaces/user-auth.interface';

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
    const token: string | undefined = request.cookies?.token;
    if (!token) throw new UnauthorizedException('Missing token');

    const authUser = await sendEvent<{ id: string; email: string }>(
      this.authService,
      AUTH_MSG_PATTERN.VERIFY_TOKEN,
      { token },
    );
    // const isInBlackList = !!(await this.cacheService.cache.get(
    //   getAuthCacheKey(token),
    // ));

    // if (isInBlackList) throw new UnauthorizedException(AUTH_ERROR.UNAUTHORIZED);

    request.user = authUser;
    return true;
  }
}
