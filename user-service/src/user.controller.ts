import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user_by_id')
  getUserById(@Payload() data: any) {
    try {
      return this.userService.findUserById(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('login')
  login(@Payload() data: LoginDto) {
    try {
      return this.userService.login(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('register')
  register(@Payload() data: CreateUserDto) {
    try {
      return this.userService.register(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
