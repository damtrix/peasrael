import { Module } from '@nestjs/common';
import { CostPriceService } from './cost-price.service';
import { CostPriceController } from './cost-price.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CostPriceService],
  controllers: [CostPriceController],
})
export class CostPriceModule {}
