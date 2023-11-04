import { Test, TestingModule } from '@nestjs/testing';
import { SellingPriceController } from './selling-price.controller';

describe('SellingPriceController', () => {
  let controller: SellingPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellingPriceController],
    }).compile();

    controller = module.get<SellingPriceController>(SellingPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
