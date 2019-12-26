import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private authServices: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authServices.decodedToken = this.helper.decodeToken(token);
    }

    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      this.authServices.changeUserMainPhoto(user.photoUrl);
    }
  }
}
