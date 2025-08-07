import {Body, Controller, Get, Post} from '@nestjs/common';
import { NotifyService } from './notify.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @EventPattern('send_confirm_mail')
  sendConfirmMail(@Payload() data) {
      try {
          const {email} = data;
          this.notifyService.sendConfirmMail(email);
      } catch (error) {
          throw new Error(error);
      }
  }

    @EventPattern('send_success_mail')
    sendSuccessMail(@Payload() data) {
      try {
          const {email} = data;
          this.notifyService.sendSuccessMail(email);
      } catch (error) {
          throw new Error(error);
      }
    }
}
