import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: { email: string; password: string }) {
    const existedUser = await this.userService.findOne({ email: dto.email });
    if (existedUser) {
      throw new RpcException({
        code: 400,
        message: 'Email already exist',
      });
    }
    return this.userService.create(dto);
  }
}
