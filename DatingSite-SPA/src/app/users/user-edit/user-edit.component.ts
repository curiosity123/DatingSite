import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  if (this.editForm.dirty) {
event.returnValue = true;
  }
}

  constructor( private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
this.route.data.subscribe(data => this.user = data.user);
  }


  updateUser() {
  this.userService.UpdateUser(this.authService.decodedToken.nameid, this.user).subscribe(next =>
     {
  this.alertify.success('Updated successfully!!!!');
  this.editForm.reset(this.user);
}, error => {
      return this.alertify.error('Update error');
    });

  }

}
