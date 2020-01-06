import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Message } from 'src/app/models/Message';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  @Input() RecipientId: number;
  messages: Message[];


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.LoadConversation();
  }


  LoadConversation() {
    this.userService.GetConversation(this.authService.decodedToken.nameid, this.RecipientId)
      .subscribe(
        response => this.messages = response,
        error => this.alertify.error('Cannot load conversation :('));
  }

}
