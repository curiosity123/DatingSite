import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
declare let alertify: any;


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userPhoto: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {

  
   this.authService.userPhoto.subscribe(photo => this.userPhoto = photo);

  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('you are logged in correctly');

    }, error => {
      this.alertify.error(error);
    }, () => this.router.navigate(['/users']));
  }


loggedIn() {
  return this.authService.loggedIn();
}


logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.alertify.message('you are logged out');
  this.router.navigate(['/home']);
}




}
