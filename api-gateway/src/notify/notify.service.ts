import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class NotifyService {
  constructor(
      @Inject('NOTIFY_SERVICE') private readonly notify_service: ClientProxy
  ) {
  }

   sendConfirmMail(email: string) {
    this.notify_service.emit("send_confirm_mail", email)
  }

    sendSuccessMail(email: string) {
        this.notify_service.emit("send_success_mail", email)
    }
}
