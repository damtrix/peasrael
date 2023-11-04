import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateQuantityParams {
  value: string;
}

@Injectable()
export class QuantityService {
  constructor(private readonly prismaService: PrismaService) {}

  async createQuantity({ value }: CreateQuantityParams, userId: string) {
    const quantity = await this.prismaService.quantity.findUnique({
      where: {
        value_userId: {
          value,
          userId,
        },
      },
    });

    if (quantity) {
      throw new HttpException('Duplicate data already exists', 400);
    }

    const quantityReg = await this.prismaService.quantity.create({
      data: { value, userId },
    });

    return quantityReg;
  }

  async updateQuantity(
    { value }: CreateQuantityParams,
    userId: string,
    id: string,
  ) {
    const quantity = await this.prismaService.quantity.findUnique({
      where: {
        id: id,
      },
    });

    if (!quantity || quantity.userId !== userId) {
      throw new HttpException('Invalid credentials', 400);
    }

    const response = await this.prismaService.quantity.update({
      where: { id },
      data: {
        value,
      },
    });

    return response;
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
