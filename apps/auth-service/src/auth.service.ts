import {
  ILoginReq,
  ILoginRes,
  IRegisterReq,
  IRegisterRes,
  IVerifyTokenReq,
  IVerifyTokenRes,
} from '@app/common';
import { throwRpcError } from '@app/common/helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: IRegisterReq): Promise<IRegisterRes> {
    const user = await this.userService.create(dto);
    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
    };
  }

  async login(dto: ILoginReq): Promise<ILoginRes> {
    const existedUser = await this.userService.findOne({ email: dto.email });
    if (
      !existedUser ||
      !(await this.validatePassword(dto.password, existedUser.password))
    ) {
      throwRpcError(new BadRequestException('Wrong username/password'));
    }

    return {
      id: existedUser._id.toString(),
      email: existedUser.email,
      token: await this.jwtService.signAsync({
        id: existedUser._id.toString(),
        email: existedUser.email,
      }),
    };
  }

  async verifyToken(dto: IVerifyTokenReq): Promise<IVerifyTokenRes> {
    try {
      const user = await this.jwtService.verifyAsync<ILoginRes>(dto.token);
      return {
        isValid: true,
        user,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throwRpcError(new BadRequestException('Expired token'));
      }
      throwRpcError(new BadRequestException('Invalid token'));
    }
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
