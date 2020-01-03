import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {


  @Input() user: User;
  constructor(private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

  like(id: number) {
    console.log("poszło");
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(res => {
      this.alertify.success('User was liked :)');
    }, error => {
      this.alertify.error('something went wrong :( ');
    });

  }

}
