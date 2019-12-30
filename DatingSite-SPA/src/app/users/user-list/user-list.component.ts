import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/models/Pagination';
import { UserParams } from 'src/app/models/UserParams';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  userParams: UserParams = new UserParams();
  pagin: Pagination;
  isCollapsed = false;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagin = data.users.pagination;
    });
  } 

  SetNewFilter(event)
  {
    console.log(event);
    this.userParams = event;
    this.loadUsers();
  }

  pageChanged(event: any) {
    this.pagin.CurrentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagin.CurrentPage, this.pagin.PageSize, this.userParams)
      .subscribe(
        (res: PaginationResult<User[]>) => {
          this.users = res.result;
          this.pagin = res.pagination;    
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
