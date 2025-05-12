import { ICreateUserReq, IFindOneUserReq } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(dto: ICreateUserReq) {
    return this.userModel.create({
      email: dto.email,
      password: dto.password,
    });
  }

  findOne(dto: IFindOneUserReq) {
    return this.userModel.findOne(dto);
  }
}
