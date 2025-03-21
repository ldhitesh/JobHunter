import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Reply {
  content: string;
  author: string;
  date: Date;
}

export interface Post {
  id: number;
  title: string;
  author: string;
  summary: string;
  date: Date;
  replies: Reply[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  

  forumPosts: Post[] = [
    {
      id: 1,
      title: 'Angular vs React: Which is better?',
      author: 'John Doe',
      summary: 'Discuss the strengths and weaknesses of Angular and React for modern web development.',
      date: new Date(),
      replies: []  // Initially empty replies array
    }
  ];

  constructor(private router: Router) {}

  addNewPost(newPost: Post): void {
    
    this.forumPosts.push(newPost);  // Add the new post to the forumPosts array
  }

  openPost(postId: number): void {
    console.log('Open post:', postId);
    // Logic to navigate to a detailed post view (not implemented here)
  }

  createPost(): void {
    this.router.navigate(['/create-post']);  // Navigate to create post page
  }




  

  
}


