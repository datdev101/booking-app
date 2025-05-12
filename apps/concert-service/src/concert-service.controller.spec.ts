import { Test, TestingModule } from '@nestjs/testing';
import { ConcertServiceController } from './concert-service.controller';
import { ConcertServiceService } from './concert-service.service';

describe('ConcertServiceController', () => {
  let concertServiceController: ConcertServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConcertServiceController],
      providers: [ConcertServiceService],
    }).compile();

    concertServiceController = app.get<ConcertServiceController>(
      ConcertServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(concertServiceController.getHello()).toBe('Hello World!');
    });
  });
});
