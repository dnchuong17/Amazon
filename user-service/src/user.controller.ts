import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}



  @MessagePattern('get_user_by_id')
  getUserById(@Payload() data) {
    try {
      return this.userService.findUserById(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
