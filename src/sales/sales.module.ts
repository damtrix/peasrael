import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [PrismaModule],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
