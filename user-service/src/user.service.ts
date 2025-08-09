import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  findUserById(user_id: number) {
    Number(user_id);
    return this.prismaService.users.findFirst({
      where: {
        user_id,
      },
    });
  }

  async findUserByEmail(email: string) {
    const existedUser = await this.prismaService.users.findFirst({
      where: {
        email: email,
      },
    });

    return existedUser;
  }

  async register(userDto: CreateUserDto) {
    const existedUser = this.findUserByEmail(userDto.email);

    if (!existedUser) {
      throw new Error('User existed');
    }

    const hashPassword = await bcrypt.hash(userDto.password, 10);

    await this.prismaService.users.create({
      data: {
        ...userDto,
        password: hashPassword,
      },
    });

    return 'User created';
  }

  async login(loginDto: LoginDto) {
    const existedUser = await this.findUserByEmail(loginDto.email);

    if (!existedUser) {
      throw new Error('User not found');
    }

    const matchPassword = await bcrypt.compare(
      loginDto.password,
      existedUser.password,
    );

    if (!matchPassword) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = {
      sub: existedUser.user_id,
      email: existedUser.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
