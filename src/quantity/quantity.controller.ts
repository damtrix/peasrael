import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { QuantityService } from './quantity.service';
import { User } from 'src/user/decorators/user.decorator';
import { UserInfo } from 'src/user/interceptors/user.interceptor';
import { QuantityDto } from './dto/quantity.dto';

@Controller('quantity')
export class QuantityController {
  constructor(private readonly quantityService: QuantityService) {}

  @Post()
  async createQuantity(@Body() body: QuantityDto, @User() user: UserInfo) {
    return await this.quantityService.createQuantity(body, user.id);
  }

  @Put(':id')
  async updateQuantity(
    @Body() body: QuantityDto,
    @User() user: UserInfo,
    @Param('id') id: string,
  ) {
    return await this.quantityService.updateQuantity(body, user.id, id);
  }

  @Get()
  async getQuantity(@User() user: UserInfo) {
    return await this.quantityService.getQuantity(user.id);
  }
}
