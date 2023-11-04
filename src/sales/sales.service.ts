import { HttpException, Injectable } from '@nestjs/common';
import { DataType, NetworkType, SalesType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateSalesParams {
  customerName?: string;
  network: NetworkType;
  outPrice?: number;
  receivedTo: string;
  type: SalesType;
  dataType: DataType;
  quantity: string;
}

@Injectable()
export class SalesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSales(
    {
      customerName,
      network,
      outPrice,
      receivedTo,
      type,
      dataType,
      quantity,
    }: CreateSalesParams,
    userId: string,
  ) {
    let profit: number;

    if (type === SalesType.airtime || type === SalesType.electricity) {
      if (!outPrice) {
        throw new HttpException('Please input price(outPrice)', 400);
      }

      switch (network) {
        case NetworkType.MTN:
          profit = outPrice * (3 / 100);
          break;
        case NetworkType.AIRTEL:
          profit = outPrice * (3 / 100);
          break;
        case NetworkType.GLO:
          profit = outPrice * (5 / 100);
          break;
        case NetworkType.MOBILE:
          profit = outPrice * (5 / 100);
          break;
      }
      quantity = 'NULL';
      dataType = DataType.NULL;
    }

    const quantityData = await this.prismaService.quantity.findUnique({
      where: { value_userId: { value: quantity, userId } },
    });

    if (type === SalesType.electricity) {
      network = NetworkType.NULL;
      quantity = 'NULL';
      profit = 0;
      dataType = DataType.NULL;
    }

    if (type === SalesType.data) {
      const costPrice = await this.prismaService.costPrice.findFirst({
        where: {
          network,
          type,
          dataType,
          quantityId: quantityData.id,
        },
      });

      const sellingPrice = await this.prismaService.sellingPrice.findFirst({
        where: {
          network,
          type,
          dataType,
          quantityId: quantityData.id,
        },
      });

      if (!costPrice || !sellingPrice) {
        throw new HttpException('Invalid credentials', 400);
      }

      if (outPrice) {
        profit = outPrice - costPrice.amount;
      } else {
        profit = sellingPrice.amount - costPrice.amount;
        outPrice = sellingPrice.amount;
      }
    }

    const salesReg = await this.prismaService.sales.create({
      data: {
        customerName,
        network,
        outPrice,
        receivedTo,
        profit,
        type,
        dataType,
        quantityId: quantityData.id,
        userId,
      },
    });

    return salesReg;
  }

  async getSaleById(id: string, userId: string) {
    const sales = await this.prismaService.sales.findMany({
      where: { id },
    });

    if (!sales || userId !== sales[0].userId) {
      throw new HttpException('Invalid credentials', 400);
    }

    return sales;
  }

  async getSales(userId: string, day: number, month: number, year: number) {
    const sales = await this.prismaService.sales.findMany({
      where: { userId },
      select: {
        customerName: true,
        network: true,
        outPrice: true,
        receivedTo: true,
        profit: true,
        type: true,
        dataType: true,
        quantity: true,
        createdAt: true,
      },
    });

    if (sales.length === 0) {
      throw new HttpException('Invalid credentials', 400);
    }

    const Days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const Months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date();
    const currentDay = Days[date.getDay()];
    const currentMonth = Months[date.getMonth()];
    const currentYear = date.getFullYear();
    const currentDate = date.getDate();

    const salesData = sales.filter(
      (sale) =>
        sale.createdAt.getDate() === day &&
        sale.createdAt.getMonth() + 1 === month &&
        sale.createdAt.getFullYear() === year,
    );

    // if (day === 'today') {
    //   salesData = sales.filter(
    //     (sale) =>
    //       sale.createdAt.getDate() === currentDate &&
    //       sale.createdAt.getMonth() === date.getMonth() &&
    //       sale.createdAt.getFullYear() === date.getFullYear(),
    //   );
    // }

    if (salesData.length === 0) {
      return `No Sales on ${day}/${month}/${year}`;
    }

    const count = salesData.length;
    let gain = 0;
    let totalPrice = 0;

    salesData.map((sale) => {
      gain = sale.profit + gain;
      totalPrice = sale.outPrice + totalPrice;
    });

    return {
      count,
      profit: gain,
      totalPrice,
      date: `${day}/${month}/${year}`,
      salesData,
    };
  }
}
