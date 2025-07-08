import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  userSelected: User;

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
    this.userSelected = new User();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users )
    this.addUser();
    this.setSelectedUser();
    this.removeUser();
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {

      if(user.id > 0) {
        this.users = this.users.map(u => (u.id == user.id) ? {... user} : u)
            
      } else {
        
        this.users = [... this.users, {... user}];
      }
      this.router.navigate(['/users'], {state: {users: this.users}});
      this.userSelected = new User();
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      
      this.users = this.users.filter(user => user.id != id)
      this.router.navigate(['/users/create'], {skipLocationChange: true }).then(() => {
        this.router.navigate(['/users'], {state: {users: this.users}});
      })
    })
  } 

  setSelectedUser(): void {
    this.sharingData.selectdUserEventEmitter.subscribe(userRow =>{

      this.userSelected = {... userRow};
    })
  }

}
