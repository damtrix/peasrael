import { DataType, NetworkType, SalesType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSellingPriceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(NetworkType)
  network: NetworkType;

  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsEnum(SalesType)
  type: SalesType;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(DataType)
  dataType: DataType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  quantity: string;
}

export class UpdateSellingPriceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(NetworkType)
  network: NetworkType;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SalesType)
  type: SalesType;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(DataType)
  dataType: DataType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  quantity: string;
}
