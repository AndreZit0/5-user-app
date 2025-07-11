import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'user',
  imports: [RouterModule,PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  users: User[] = [];
  title: string = 'Listado de Usuarios';
  paginator: any = {};

  constructor(private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
  ) {
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }
  ngOnInit(): void {
    if(this.users == undefined || this.users == null || this.users.length == 0){
      console.log('Consulta findAll')
      // this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || '0');
      console.log(page);
      this.service.findAllPageable(page).subscribe(pageable => {
        this.users = pageable.content as User[];
        this.paginator = pageable;
        this.sharingData.pageUserEventEmitter.emit({users: this.users, paginator:  this.paginator})} );

    })
    }
  }

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
            this.sharingData.idUserEventEmitter.emit(id);
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



}