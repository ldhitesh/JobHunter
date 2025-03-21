import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  title: string = '';
  author: string = '';
  summary: string = '';

  @Output() postCreated = new EventEmitter<any>();  // Emit new post to the parent component

  constructor(private router: Router) {}

  createPost(): void {
    if (this.title && this.author && this.summary) {
      const newPost = {
        id:'' ,  // Generate a unique ID based on timestamp
        title: this.title,
        author: this.author,
        summary: this.summary,
        date: new Date(),
        replies: []  // Initially no replies
      };

      // Emit the new post to the parent component
      this.postCreated.emit(newPost);

      // Reset the form fields after creating the post
      this.title = '';
      this.author = '';
      this.summary = '';

      // Navigate back to the forum posts page
      this.router.navigate(['/home']);
    }
  }
}