import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  constructor(_status?: HttpStatus.OK | HttpStatus.CREATED) {
    const status = _status ?? HttpStatus.OK;
    this.code = status;
    this.message = HttpStatus[status];
  }
}
