import {
  IGetAllConcertReq,
  IGetByIdConcertReq,
} from '@app/common/interfaces/concert.interface';
import { PartialType, PickType } from '@nestjs/swagger';
import { ConcertDto } from './base.dto';

export class GetAllConcertReq
  extends PartialType(PickType(ConcertDto, ['isActive']))
  implements IGetAllConcertReq {}

export class GetByIdConcertReq
  extends PickType(ConcertDto, ['id'])
  implements IGetByIdConcertReq {}
