import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    UserService,
  ],
})
export class UserModule {}
