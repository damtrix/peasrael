import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface SignupParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  username: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(
    { email, password, firstName, lastName, phone, username }: SignupParams,
    userType: UserType,
  ) {
    const userExists = await this.user(email);

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        phone,
        username,
        userType,
      },
    });

    const token = await this.generateJWT(username, user.id);

    return { token };
  }

  async signin({ email, password }: SigninParams) {
    const user = await this.user(email);

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = await this.generateJWT(user.username, user.id);

    return { token };
  }

  private async generateJWT(username: string, id: string) {
    return await jwt.sign(
      {
        username,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600000,
      },
    );
  }

  private async user(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hash(string, 10);
  }
}
