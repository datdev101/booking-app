import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.constant';

@Controller('event')
@ApiTags('event')
export class EventController {
  constructor(
    @Inject(EventService) private readonly eventService: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse()
  getAll() {}

  @Get(':id')
  @ApiOkResponse()
  getById() {}
}
