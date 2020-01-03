import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserLikesResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 18;
  likesParam = 'UserLikes';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
      catchError(error => {
        this.alertify.error('Cant load data');
        this.router.navigate(['']);
        return of(null);
      })
    );
  }
}
