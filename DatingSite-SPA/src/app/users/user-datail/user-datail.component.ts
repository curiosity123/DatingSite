import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.css']
})
export class UserDatailComponent implements OnInit {

  user: User;


  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id'])
      .subscribe(
        (user: User) => {
          this.user = user;
        },
        error => {
          this.alertifyService.error(error);
        })
}

}
