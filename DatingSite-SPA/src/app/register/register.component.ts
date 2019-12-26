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


  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();


  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {
    this.maxDate.setFullYear(2000,1,1);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit() {

    this.buildForm();
  }


  buildForm()
  {
  this.registerForm = this.fb.group({

    gender: ['female', Validators.required],
    dateOfBirth: [null, Validators.required],
    zodiacSign: ['', Validators.required],
    city : ['', Validators.required],
    country: ['', Validators.required],


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
