import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
})
export class FormUserComponent implements OnInit {
  user!: User;

  errors: any = {};

  constructor(
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private service: UserService
  ) {
    this.user = new User();
  }
  ngOnInit(): void {
    // this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);
    this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);
    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        // this.sharingData.findUserByIdEventEmitter.emit(id);
        this.service.findById(id).subscribe((user) => (this.user = user));
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    // if (userForm.valid) {
    this.sharingData.newUserEventEmitter.emit(this.user);
    console.log(this.user);
    // userForm.reset();
    // userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
    this.errors = {};
  }
}
