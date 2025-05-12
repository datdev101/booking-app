import { Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: { email: string; password: string }) {
    const existedUser = await this.userService.findOne({ email: dto.email });
    if (existedUser) {
      throw new RpcException('Email already exist');
    }
    return this.userService.create({
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    });
  }

  async login(dto: { email: string; password: string }) {
    const existedUser = await this.userService.findOne({ email: dto.email });
    if (
      !existedUser ||
      !(await this.validatePassword(dto.password, existedUser.password))
    ) {
      throw new RpcException('Wrong username/password');
    }

    return {
      token: await this.jwtService.signAsync({
        id: existedUser._id.toString(),
        email: existedUser.email,
      }),
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new RpcException('Expired token');
      }
      throw new RpcException('Invalid token');
    }
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
