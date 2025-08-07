import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(
      private readonly prismaService: PrismaService
  ) {
  }

  findUserById(user_id: number) {
    Number(user_id)
    return this.prismaService.users.findFirst({
      where: {
        user_id
      }
    });
  }
}
