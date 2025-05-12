import { throwRpcError } from '@app/common/helper';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: { email: string; password: string }) {
    const existedUser = await this.userService.findOne({ email: dto.email });
    if (existedUser) {
      throwRpcError(new UnprocessableEntityException('Email already exist'));
    }
    return this.userService.create({
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    });
  }
}
