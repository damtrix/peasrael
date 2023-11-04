import { Test, TestingModule } from '@nestjs/testing';
import { SellingPriceService } from './selling-price.service';

describe('SellingPriceService', () => {
  let service: SellingPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellingPriceService],
    }).compile();

    service = module.get<SellingPriceService>(SellingPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
