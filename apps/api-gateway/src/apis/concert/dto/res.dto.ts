import { IGetAllConcertRes } from '@app/common/interfaces/concert.interface';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ConcertDto } from './base.dto';

export class GetAllConcertResDataDto extends PickType(ConcertDto, [
  'id',
  'name',
  'date',
  'isActive',
]) {
  constructor(dto: IGetAllConcertRes['data'][0]) {
    super();
    this.id = dto._id;
    this.name = dto.name;
    this.date = dto.date;
    this.isActive = dto.isActive;
  }
}

export class GetAllConcertResDto {
  @ApiProperty({ isArray: true, type: GetAllConcertResDataDto })
  data: GetAllConcertResDataDto[];

  constructor(dto: IGetAllConcertRes) {
    this.data = dto.data.map((e) => new GetAllConcertResDataDto(e));
  }
}
