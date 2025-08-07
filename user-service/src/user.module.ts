import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "./prisma/prisma.service";
import {PrismaModule} from "./prisma/prisma.module";


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
