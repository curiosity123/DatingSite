import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'util';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }


  buildForm()
  {
  this.registerForm = this.fb.group({
  userName: ['', Validators.required],
  password: ['', [
        Validators.required,
        Validators.maxLength(14),
        Validators.minLength(6)
      ]],
  confirmPassword: ['', [
      Validators.required,
      Validators.maxLength(14),
      Validators.minLength(6),
    ]]
    }, {validator: this.confirmedPasswordEqualsPassword});

  }

  confirmedPasswordEqualsPassword(fc: FormControl) {
    return fc.get('password').value === fc.get('confirmPassword').value ? null : {mismatch: true };
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //  this.alertify.success('success'); },
    //   error => {this.alertify.error(error); });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
