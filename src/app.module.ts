import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptors/user.interceptor';
import { AuthGuard } from './guards/auth.guards';
import { CostPriceModule } from './cost-price/cost-price.module';
import { SellingPriceModule } from './selling-price/selling-price.module';
import { SalesService } from './sales/sales.service';
import { SalesController } from './sales/sales.controller';
import { SalesModule } from './sales/sales.module';
import { QuantityModule } from './quantity/quantity.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CostPriceModule,
    SellingPriceModule,
    SalesModule,
    QuantityModule,
  ],
  controllers: [AppController, SalesController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SalesService,
  ],
})
export class AppModule {}
