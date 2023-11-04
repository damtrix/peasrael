import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dtos/auth.dto';
import { UpdateUserResponseDto } from './dtos/user.dto';

interface updateUserDateParams {
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async me(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return new UserResponseDto(user);
  }

  async updateUser(
    id: string,
    { firstName, lastName, phone, username }: updateUserDateParams,
  ) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const response = await this.prismaService.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phone,
        username,
      },
    });

    return new UpdateUserResponseDto(response);
  }

  async getCostPrice(userId: string) {
    const costPrice = await this.prismaService.costPrice.findMany({
      where: { userId },
      select: {
        id: true,
        network: true,
        amount: true,
        type: true,
        dataType: true,
        quantity: true,
        userId: true,
      },
    });

    if (costPrice.length === 0) {
      throw new HttpException('Invalid credentials', 400);
    }

    const count = costPrice.length;

    return { count, costPrice };
  }

  async getSellingPrice(userId: string) {
    const sellingPrice = await this.prismaService.sellingPrice.findMany({
      where: { userId },
      select: {
        id: true,
        network: true,
        amount: true,
        type: true,
        dataType: true,
        quantity: true,
        userId: true,
      },
    });

    if (sellingPrice.length === 0) {
      throw new HttpException('Invalid credentials', 400);
    }

    const count = sellingPrice.length;

    return { count, sellingPrice };
  }

  async getQuantity(userId: string) {
    const quantity = await this.prismaService.quantity.findMany({
      where: { userId },
    });

    if (quantity.length === 0) {
      throw new HttpException('Invalid credentials', 400);
    }

    const count = quantity.length;

    return { count, quantity };
  }
}
