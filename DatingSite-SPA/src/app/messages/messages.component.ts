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

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute) { }


  pagin: Pagination;
  messages: Message[];
  messageContainer = 'Inbox';
  flagOutbox = false;


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
          if (res.result[0].messageContainer === 'Outbox') {
            this.flagOutbox = true;
          }
          else
          {
            this.flagOutbox = false;
          }
        },
        error => {
          this.alertify.error(error);
        }
      );
  }


  deleteMessage(id: number) {
  this.alertify.confirm('Do you realy want to remove this message', () => {
    this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);

      this.alertify.success('message removed');
    }, error => this.alertify.error('delete message failed'));
  });
}

}
