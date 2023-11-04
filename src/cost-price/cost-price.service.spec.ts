import { Test, TestingModule } from '@nestjs/testing';
import { CostPriceService } from './cost-price.service';

describe('CostPriceService', () => {
  let service: CostPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostPriceService],
    }).compile();

    service = module.get<CostPriceService>(CostPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
