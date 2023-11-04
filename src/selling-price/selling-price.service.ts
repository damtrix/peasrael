import { HttpException, Injectable } from '@nestjs/common';
import { DataType, NetworkType, SalesType } from '@prisma/client';
import { AirtimeResponseDto, ElectricityResponseDto } from 'src/dto/util.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface SellingPriceParams {
  network: NetworkType;
  amount: number;
  type: SalesType;
  dataType: DataType;
  quantity: string;
}

interface UpdateSellingPriceParams {
  network?: NetworkType;
  amount?: number;
  type?: SalesType;
  dataType?: DataType;
  quantity?: string;
}

@Injectable()
export class SellingPriceService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSellingPrice(
    { network, amount, type, dataType, quantity }: SellingPriceParams,
    userId: string,
  ) {
    if (type === SalesType.airtime || type === SalesType.electricity) {
      quantity = 'NULL';
      dataType = DataType.NULL;
    }

    const quantityData = await this.prismaService.quantity.findUnique({
      where: { value_userId: { value: quantity, userId } },
    });

    if (type === SalesType.electricity) {
      network = NetworkType.NULL;
    }

    const sellingPrice = await this.prismaService.sellingPrice.findUnique({
      where: {
        network_amount_type_dataType_quantityId_userId: {
          network,
          amount,
          type,
          dataType,
          quantityId: quantityData.id,
          userId,
        },
      },
    });

    if (sellingPrice) {
      throw new HttpException('Duplicate data already exists', 400);
    }

    const sellingPriceReg = await this.prismaService.sellingPrice.create({
      data: {
        network,
        amount,
        type,
        dataType,
        quantityId: quantityData.id,
        userId,
      },
    });

    if (type === SalesType.electricity) {
      return new ElectricityResponseDto(sellingPriceReg);
    }

    if (type === SalesType.airtime) {
      return new AirtimeResponseDto(sellingPriceReg);
    }

    return sellingPriceReg;
  }

  async getSellingPrice(id: string, userId: string) {
    const sellingPrice = await this.prismaService.sellingPrice.findMany({
      where: { id },
    });

    if (!sellingPrice || userId !== sellingPrice[0].userId) {
      throw new HttpException('Invalid credentials', 400);
    }

    const count = sellingPrice.length;

    return { count, sellingPrice };
  }

  async updateSellingPrice(
    id: string,
    userId: string,
    { amount, type, network, quantity, dataType }: UpdateSellingPriceParams,
  ) {
    if (type === SalesType.airtime || type === SalesType.electricity) {
      quantity = 'NULL';
      dataType = DataType.NULL;
    }

    const quantityData = await this.prismaService.quantity.findUnique({
      where: { value_userId: { value: quantity, userId } },
    });

    if (type === SalesType.electricity) {
      network = NetworkType.NULL;
    }

    const sellingPrice = await this.prismaService.sellingPrice.findUnique({
      where: { id },
    });

    if (!sellingPrice || sellingPrice.userId !== userId) {
      throw new HttpException('Invalid credentials', 400);
    }

    const response = await this.prismaService.sellingPrice.update({
      where: { id },
      data: { amount, type, network, quantityId: quantityData.id, dataType },
    });

    return response;
  }
}
