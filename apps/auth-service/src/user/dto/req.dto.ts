import { IRegisterReq } from '@app/common';
import { PickType } from '@nestjs/swagger';
import { UserDto } from './base.dto';

export class CreateUserDto
  extends PickType(UserDto, ['email', 'password'])
  implements IRegisterReq {}
