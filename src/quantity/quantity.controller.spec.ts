import { Test, TestingModule } from '@nestjs/testing';
import { QuantityController } from './quantity.controller';

describe('QuantityController', () => {
  let controller: QuantityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuantityController],
    }).compile();

    controller = module.get<QuantityController>(QuantityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
