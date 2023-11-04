import { DataType, NetworkType, SalesType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSalesDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEnum(NetworkType)
  network: NetworkType;

  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  outPrice: number;

  @IsNotEmpty()
  @IsString()
  receivedTo: string;

  @IsNotEmpty()
  @IsEnum(SalesType)
  type: SalesType;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(DataType)
  dataType: DataType;

  @IsNotEmpty()
  @IsString()
  quantity: string;
}
