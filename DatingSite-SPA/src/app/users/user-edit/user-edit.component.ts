import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm', {static: false}) editForm: NgForm;


  constructor( private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
this.route.data.subscribe(data => this.user = data.user);
  }


  updateUser() {
    this.alertify.success('updated!!!!');
    this.editForm.reset(this.user);
  }

}
