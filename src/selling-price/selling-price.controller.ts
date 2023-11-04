import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { SellingPriceService } from './selling-price.service';
import {
  CreateSellingPriceDto,
  UpdateSellingPriceDto,
} from './dto/selling-price.dto';
import { UserInfo } from 'src/user/interceptors/user.interceptor';
import { User } from 'src/user/decorators/user.decorator';

@Controller('sellingPrice')
export class SellingPriceController {
  constructor(private readonly sellingPriceService: SellingPriceService) {}

  @Post(':id')
  async createSellingPriceId(
    @Body() body: CreateSellingPriceDto,
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new UnauthorizedException();
    }

    return await this.sellingPriceService.createSellingPrice(body, id);
  }

  @Post()
  async createSellingPrice(
    @Body() body: CreateSellingPriceDto,
    @User() user: UserInfo,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.sellingPriceService.createSellingPrice(body, user.id);
  }

  @Put(':id')
  async updateSellingPriceId(
    @Body() body: UpdateSellingPriceDto,
    @User() user: UserInfo,
    @Param('id') id: string,
  ) {
    if (!id || !user) {
      throw new UnauthorizedException();
    }

    return await this.sellingPriceService.updateSellingPrice(id, user.id, body);
  }

  @Get(':id')
  async getSellingPriceId(@Param('id') id: string, @User() user: UserInfo) {
    if (!id || !user) {
      throw new UnauthorizedException();
    }

    return await this.sellingPriceService.getSellingPrice(id, user.id);
  }
}
