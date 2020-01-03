import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../models/User';
import { Pagination, PaginationResult } from '../models/Pagination';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  users: User[];
  likeParams: string;
  pagin: Pagination;


  constructor(private alertify:AlertifyService,
              private route: ActivatedRoute,
              private authService:AuthService,
              private userService:UserService) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagin = data.users.pagination;
      this.likeParams = data.users.likeParams;
    });
  }


  pageChanged(event: any) {
    this.pagin.CurrentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagin.CurrentPage, this.pagin.PageSize,null, this.likeParams)
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
