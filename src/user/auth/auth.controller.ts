import {
  Body,
  Controller,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';

import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType !== UserType.USER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidPassword = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException();
      }
    }
    return this.authService.signup(body, userType);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Roles(UserType.ADMIN)
  @Post('/key')
  generateProductKey(@Body() { userType, email }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(email, userType);
  }
}
