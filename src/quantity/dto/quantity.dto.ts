import { IsNotEmpty, IsString } from 'class-validator';

export class QuantityDto {
  @IsNotEmpty()
  @IsString()
  value: string;
}
