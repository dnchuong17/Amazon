import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifyService } from './notify.service';
import {Payload} from "@nestjs/microservices";

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}
}
