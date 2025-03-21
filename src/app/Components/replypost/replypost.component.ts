import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-replypost',
  templateUrl: './replypost.component.html',
  styleUrls: ['./replypost.component.css']
})
export class ReplypostComponent {
  @Input() postId: number | undefined; // Receiving the postId to know where to reply
  @Output() replyAdded = new EventEmitter<{ postId: number, reply: any }>(); // EventEmitter to send the reply to the parent

  replyContent: string = '';

  submitReply(): void {
    if (this.replyContent && this.postId !== undefined) {
      const reply: any = {
        content: this.replyContent,
        author: 'Anonymous',  // You can replace this with actual user data
        date: new Date()
      };

      // Emit the reply data to the parent component
      this.replyAdded.emit({ postId: this.postId, reply });

      this.replyContent = '';  // Clear the input field after submission
    }
  }
}
