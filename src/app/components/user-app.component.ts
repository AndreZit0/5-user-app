import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {

  users: User[] = [];
  paginator: any ={};

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
  ) {
  
  }
  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   const page = +(params.get('page') || '0');
    //   console.log(page);
    //   this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[] );

    // });
    // this.service.findAll().subscribe(users => this.users = users );
    this.addUser();
    this.removeUser();
    this.finUserById();
    this.pageUserEvent();
  }

  pageUserEvent() {
    this.sharingData.pageUserEventEmitter.subscribe( pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
  }

  finUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {

      if(user.id > 0) {
        this.service.update(user).subscribe({next:(userUpdated) => {

          this.users = this.users.map(u => (u.id == userUpdated.id) ? {... userUpdated} : u)
          this.router.navigate(['/users'], {state: {users: this.users}});
            Swal.fire({
            title: 'Actualizado Exitosamente!',
            icon: 'success',
            draggable: true,
            });  
        },
      error: (err) => {
        // console.log(err.error)
        if (err.status == 400) {
          this.sharingData.errorsUserFormEventEmitter.emit(err.error);
        }
    }})
            
      } else {
        this.service.create(user).subscribe( {
          next: (userNew) => {
            console.log(user);
            this.users = [... this.users, {... userNew}];
            this.router.navigate(['/users/create'], {state: {users: this.users,
            paginator: this.paginator
            }});
            Swal.fire({
            title: 'Agregado Exitosamente!',
            icon: 'success',
            draggable: true,
            });
          },
          error: (err) =>  {
            // console.log(err.error)
            console.log(err.status);
            if (err.status == 400) {

              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }})
      }
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      this.service.remove(id).subscribe(() => {
        this.users = this.users.filter(user => user.id != id)
        this.router.navigate(['/users/create'], {skipLocationChange: true }).then(() => {
          this.router.navigate(['/users'], {state: {users: this.users,
            paginator: this.paginator,
          }});
        });

      })
    })
    this.pageUserEvent();
  } 

  

}
