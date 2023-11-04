import { Module } from '@nestjs/common';
import { SellingPriceService } from './selling-price.service';
import { SellingPriceController } from './selling-price.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SellingPriceService],
  controllers: [SellingPriceController],
})
export class SellingPriceModule {}
