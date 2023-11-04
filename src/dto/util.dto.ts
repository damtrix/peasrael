import { DataType, NetworkType, SalesType } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ElectricityResponseDto {
  id: string;
  amount: number;
  type: SalesType;
  userId: string;

  @Exclude()
  dataType: DataType;

  @Exclude()
  network: NetworkType;

  @Exclude()
  quantity: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ElectricityResponseDto>) {
    Object.assign(this, partial);
  }
}

export class AirtimeResponseDto {
  id: string;
  amount: number;
  type: SalesType;
  network: NetworkType;
  userId: string;

  @Exclude()
  dataType: DataType;

  @Exclude()
  quantity: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ElectricityResponseDto>) {
    Object.assign(this, partial);
  }
}

export class DataResponseDto {
  id: string;
  amount: number;
  type: SalesType;
  network: NetworkType;
  dataType: DataType;
  userId: string;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ElectricityResponseDto>) {
    Object.assign(this, partial);
  }
}
