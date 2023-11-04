import { Module } from '@nestjs/common';
import { QuantityService } from './quantity.service';
import { QuantityController } from './quantity.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [QuantityService],
  controllers: [QuantityController],
})
export class QuantityModule {}
