import { Injectable } from '@nestjs/common';
import {configEmail} from "./config/config-email";

@Injectable()
export class NotifyService {

  sendConfirmMail(email: string) {
    let confirmMail = {
      from: "peter.study666@gmail.com",
      to: "nvtu2305@gmail.com",
      subject: "Verify Email",
      html: "<h2 style='color: blue'>Verify your order</h2>"
    }

    configEmail.sendMail(confirmMail, (error) => error);
  }

  sendSuccessMail(email: string) {
    let confirmMail = {
      from: "peter.study666@gmail.com",
      to: "nvtu2305@gmail.com",
      subject: "Order Successfully",
      html: "<h2 style='color: blue'>Successfully</h2>"
    }

    configEmail.sendMail(confirmMail, (error) => error);
  }
}
