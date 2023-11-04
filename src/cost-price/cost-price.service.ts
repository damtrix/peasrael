import { HttpException, Injectable } from '@nestjs/common';
import { DataType, NetworkType, SalesType } from '@prisma/client';
import { AirtimeResponseDto, ElectricityResponseDto } from 'src/dto/util.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface CostPriceParams {
  network: NetworkType;
  amount: number;
  type: SalesType;
  dataType: DataType;
  quantity: string;
}

interface UpdateCostPriceParams {
  network?: NetworkType;
  amount?: number;
  type?: SalesType;
  dataType?: DataType;
  quantity?: string;
}

@Injectable()
export class CostPriceService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCostPrice(
    { network, amount, type, dataType, quantity }: CostPriceParams,
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

    const costPrice = await this.prismaService.costPrice.findUnique({
      where: {
        network_amount_type_dataType_quantityId_userId: {
          network,
          amount,
          type,
          dataType,
          quantityId: quantityData.id,
          userId: userId,
        },
      },
    });

    if (costPrice) {
      throw new HttpException('Duplicate data already exists', 400);
    }

    const costPriceReg = await this.prismaService.costPrice.create({
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
      return new ElectricityResponseDto(costPriceReg);
    }

    if (type === SalesType.airtime) {
      return new AirtimeResponseDto(costPriceReg);
    }

    return costPriceReg;
  }

  async getCostPrice(id: string, userId: string) {
    const costPrice = await this.prismaService.costPrice.findMany({
      where: { id },
    });

    if (!costPrice || userId !== costPrice[0].userId) {
      throw new HttpException('Invalid credentials', 400);
    }

    const count = costPrice.length;

    return { count, costPrice };
  }

  async updateCostPrice(
    id: string,
    userId: string,
    { amount, type, network, quantity, dataType }: UpdateCostPriceParams,
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

    const costPrice = await this.prismaService.costPrice.findUnique({
      where: { id },
    });

    if (!costPrice || costPrice.userId !== userId) {
      throw new HttpException('Invalid credentials', 400);
    }

    const response = await this.prismaService.costPrice.update({
      where: { id },
      data: { amount, type, network, quantityId: quantityData.id, dataType },
    });

    return response;
  }
}
