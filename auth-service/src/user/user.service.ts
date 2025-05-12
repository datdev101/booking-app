import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(dto: { email: string; password: string }) {
    return this.userModel.create({
      _id: new Types.ObjectId(),
      email: dto.email,
      password: dto.password,
    });
  }

  findOne(dto: Partial<{ email: string; id: string }>) {
    return this.userModel.findOne(dto);
  }
}
