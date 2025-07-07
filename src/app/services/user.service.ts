import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Andres',
      lastname: 'Perez',
      email: 'andres@gmail.com',
      username: 'andres',
      password: '12345',
    },
    {
      id: 2,
      name: 'Jhonathan',
      lastname: 'Alvarez',
      email: 'jhonathan@gmail.com',
      username: 'jhonathan',
      password: '54321',
    },
  ];

  constructor() {}

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
