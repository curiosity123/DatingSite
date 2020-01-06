import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from '../models/Pagination';
import { Message } from '../models/Message';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  pagin: Pagination;
  messages: Message[];
  messageContainer= 'Inbox'


  constructor(    
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagin = data.messages.pagination;
    });
  }



  pageChanged(event: any) {
    this.pagin.CurrentPage = event.page;
    this.loadMessages();
  }

  loadMessages() {
    this.userService
      .getMessages(this.authService.decodedToken.nameid, this.pagin.CurrentPage, this.pagin.PageSize, this.messageContainer)
      .subscribe(
        (res: PaginationResult<Message[]>) => {
          this.messages = res.result;
          console.log(this.messages);
          this.pagin = res.pagination;    
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

}
