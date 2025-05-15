import { ILoginReq, IRegisterReq } from '@app/common';
import { PickType } from '@nestjs/swagger';
import { UserDto } from './base.dto';

export class RegisterReqDto
  extends PickType(UserDto, ['email', 'password'])
  implements IRegisterReq {}

export class LoginReqDto
  extends PickType(UserDto, ['email', 'password'])
  implements ILoginReq {}
