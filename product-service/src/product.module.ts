import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), CacheModule.register({
    isGlobal: true,
    ttl: 36000,
    max: 5, //maximum key of cache
  })],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
