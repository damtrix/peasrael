import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { UserInfo } from './interceptors/user.interceptor';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { UpdateUserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@User() user: UserInfo) {
    return this.userService.me(user.id);
  }

  @Roles(UserType.ADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.me(id);
  }

  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateUserById(@Body() body: UpdateUserDto, @Param('id') id: string) {
    if (!id) {
      throw new UnauthorizedException();
    }

    return this.userService.updateUser(id, body);
  }

  @Put()
  async updateUser(@Body() body: UpdateUserDto, @User() user: UserInfo) {
    if (!user.id) {
      throw new UnauthorizedException();
    }

    return this.userService.updateUser(user.id, body);
  }

  @Get(':id/costPrice')
  async getCostPriceId(@Param('id') id: string) {
    if (!id) {
      throw new UnauthorizedException();
    }

    return await this.userService.getCostPrice(id);
  }

  @Get(':id/sellingPrice')
  async getSellingPriceId(@Param('id') id: string) {
    if (!id) {
      throw new UnauthorizedException();
    }

    return await this.userService.getSellingPrice(id);
  }

  @Get(':id/quantity')
  async getQuantityId(@Param('id') id: string) {
    if (!id) {
      throw new UnauthorizedException();
    }

    return await this.userService.getQuantity(id);
  }
}
