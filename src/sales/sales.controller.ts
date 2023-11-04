import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/sales.dto';
import { User } from 'src/user/decorators/user.decorator';
import { UserInfo } from 'src/user/interceptors/user.interceptor';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async createSales(@Body() body: CreateSalesDto, @User() user: UserInfo) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.salesService.createSales(body, user.id);
  }

  @Get()
  async getSales(
    @User() user: UserInfo,
    @Query('day')
    dayProvided?: number,
    @Query('month') monthProvided?: number,
    @Query('year') yearProvided?: number,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    let day: number;
    let month: number;
    let year: number;
    dayProvided ? (day = dayProvided) : (day = currentDate);
    monthProvided ? (month = monthProvided) : (month = currentMonth + 1);
    yearProvided ? (year = yearProvided) : (year = currentYear);

    return await this.salesService.getSales(user.id, day, month, year);
  }
}
