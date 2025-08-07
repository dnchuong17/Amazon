import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {catchError, lastValueFrom, of, retry, timeout} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class UserService {
  constructor(
      @Inject('USER_SERVICE') private readonly user_service: ClientProxy
  ) {
  }

  async findUserByID(user_id: number) {
    const data = await lastValueFrom(this.user_service.send('get_user_by_id', user_id).pipe(
        timeout(5000),
        retry(3),
        catchError(error =>
        {
          console.log(error)
          return of({error: "user service error!"})
        })
    ));
    return data;
  }

}
