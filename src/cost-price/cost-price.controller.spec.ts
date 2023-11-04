import { Test, TestingModule } from '@nestjs/testing';
import { CostPriceController } from './cost-price.controller';

describe('CostPriceController', () => {
  let controller: CostPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostPriceController],
    }).compile();

    controller = module.get<CostPriceController>(CostPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
