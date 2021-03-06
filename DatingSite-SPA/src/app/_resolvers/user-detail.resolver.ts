import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class UserDetailResolver implements Resolve<User> {


    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService) {

        }


        resolve(route: ActivatedRouteSnapshot): Observable<User> {
         return this.userService.getUser(route.params.id).pipe(
             catchError(error => {
                 this.alertify.error('Cant load data');
                 this.router.navigate(['/Users']);
                 return of(null);
             })
         );
        }

}
