import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'util';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertify:AlertifyService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(() => {
     this.alertify.success('success');}, 
      error => {this.alertify.error('register error');});
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
