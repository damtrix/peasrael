import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { CostPriceService } from './cost-price.service';
import { User } from 'src/user/decorators/user.decorator';
import { UserInfo } from '../user/interceptors/user.interceptor';
import { CreateCostPriceDto, UpdateCostPriceDto } from './dto/cost-price.dto';

@Controller('costPrice')
export class CostPriceController {
  constructor(private readonly costPriceService: CostPriceService) {}

  @Post(':id')
  async createCostPriceId(
    @Body() body: CreateCostPriceDto,
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new UnauthorizedException();
    }

    return await this.costPriceService.createCostPrice(body, id);
  }

  @Post()
  async createCostPrice(
    @Body() body: CreateCostPriceDto,
    @User() user: UserInfo,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.costPriceService.createCostPrice(body, user.id);
  }

  @Put(':id')
  async updateCostPriceId(
    @Body() body: UpdateCostPriceDto,
    @User() user: UserInfo,
    @Param('id') id: string,
  ) {
    if (!id || !user) {
      throw new UnauthorizedException();
    }

    return await this.costPriceService.updateCostPrice(id, user.id, body);
  }

  @Get(':id')
  async getCostPriceId(@Param('id') id: string, @User() user: UserInfo) {
    if (!id || !user) {
      throw new UnauthorizedException();
    }

    return await this.costPriceService.getCostPrice(id, user.id);
  }
}
