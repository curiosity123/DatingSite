import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class UserEditResolver implements Resolve<User> {


    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private authService:AuthService) {

        }


        resolve(route: ActivatedRouteSnapshot): Observable<User> {
         return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
             catchError(error => {
                 this.alertify.error('Cant load data');
                 this.router.navigate(['/Users']);
                 return of(null);
             })
         );
        }

}
