import { NumberValueAccessor } from '@angular/forms';

export class Message {

   id: number;
   senderId: number;
   senderUserName: string;
   senderPhotoUrl: string;
   recipientId: number;
   recipientUserName: string;
   recipientPhotoUrl: string;
   content: string;
   isRead: boolean;
   dateRead: Date;
   dateSend: Date;
   messageContainer: string;
}
