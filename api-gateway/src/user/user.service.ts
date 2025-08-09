import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {catchError, lastValueFrom, of, retry, throwError, timeout} from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly user_service: ClientProxy,
  ) {}

  async findUserByID(user_id: number) {
    const data = await lastValueFrom(
      this.user_service.send('get_user_by_id', user_id).pipe(
        timeout(5000),
        retry(3),
        catchError((error) => {
          console.log(error);
          return of({ error: 'user service error!' });
        }),
      ),
    );
    return data;
  }

  async register(register: CreateUserDto) {
    const data = await lastValueFrom(
      this.user_service.send('register', register).pipe(
        timeout(5000),
        retry(3),
        catchError((error) => {
          console.log(error);
          return of({ error: 'register in user service is error!' });
        }),
      ),
    );

    return data;
  }

  async login(loginDto: LoginDto) {
    const data = await lastValueFrom(
      this.user_service.send('login', loginDto).pipe(
        timeout(5000),
        catchError((err: any) => {
          const status =
            err?.status ?? err?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
          const message = err?.message ?? 'Login error';
          return throwError(() => new HttpException(message, status));
        }),
      ),
    );

    return data;
  }
}
