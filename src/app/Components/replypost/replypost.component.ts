import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-replypost',
    templateUrl: './replypost.component.html',
    styleUrls: ['./replypost.component.css'],
    standalone: false
})
export class ReplypostComponent {
  @Input() postId: number | undefined; // Receiving the postId to know where to reply
  @Output() replyAdded = new EventEmitter<{ postId: number, reply: any }>(); // EventEmitter to send the reply to the parent

}
