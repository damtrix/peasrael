import { UserType } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UpdateUserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsOptional()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'Phone must be a valid phone number',
  })
  phone: string;
}
