import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'user-app',
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {

  title: string = 'Listado de Usuarios';

  users: User[] = [];

  userSelected: User;

  open: boolean = false;

  constructor(
    private service: UserService
  ) {
    this.userSelected = new User();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users )
  }

  addUser(user: User) {
    if(user.id > 0) {
      this.users = this.users.map(u => (u.id == user.id) ? {... user} : u)
          
    } else {
      
      this.users = [... this.users, {... user}];
    }
    this.userSelected = new User();
    this.setOpen();
  }

  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id != id)
  } 

  setSelectedUser(userRow: User): void {
    this.userSelected = {... userRow};
    this.setOpen();
  }

  setOpen() {
    this.open = !this.open;
  }

}
