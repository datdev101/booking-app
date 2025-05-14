import { ICreateUserReq, IFindOneUserReq } from '@app/common';
import { throwRpcError } from '@app/common/helper';
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async create(dto: ICreateUserReq) {
    try {
      const createdUser = new this.userModel({
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      });
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throwRpcError(new UnprocessableEntityException('Email already exist'));
      }
      throwRpcError(new InternalServerErrorException('Error creating user'));
    }
  }

  findOne(dto: IFindOneUserReq) {
    return this.userModel.findOne(dto).exec();
  }

  private async seedData() {
    const existResult = await this.userModel.findOne();
    if (existResult) return [];

    const concertsData = Array.from({ length: 1000 }).map((_, i) => {
      return {
        email: `user${i}@email.com`,
        password:
          '$2b$10$i0.dP.IXej0wjFktwPYcqOAtNxFBkmWFYdyaTYO5aP2dOdibPJc.G', // 123456
      };
    });

    return await this.userModel.insertMany(concertsData);
  }
}
