import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

 @Input() users: User[] = [];

  


 @Output() idUserEventemitter = new EventEmitter();
 @Output() selectdUserEventEmitter = new EventEmitter();

 onRemoveUser(id: number):  void {

  Swal.fire({
        title: 'Eliminar?',
        text: 'el Usuario se eliminara',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminalo!',
      }).then((result) => {
        if (result.isConfirmed) {
            this.idUserEventemitter.emit(id);
            Swal.fire({
            title: 'Eliminado!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      });

    // const confirmRemove = confirm('Esta seguro que desea eliminar?');
    // if(confirmRemove){
      
    // }
 }

 onSlectedUser(user: User): void{
  this.selectdUserEventEmitter.emit(user);
 }

}
