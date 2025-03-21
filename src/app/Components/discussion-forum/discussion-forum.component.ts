import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';



@Component({
  selector: 'discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css']
})
export class DiscussionForumComponent {
  forumPosts:any = [];
  showForm: boolean = false;
  showAllPosts = false;
  currentdisplayedposts=1;

    constructor(private http:HttpClient,private router:Router,
                private authService:AuthService){
          
                  this.fetchposts();
                }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  fetchposts(){
    this.http.get('http://localhost:80/api/discussion/getposts').subscribe({
      next: (data:any) => {        
        this.forumPosts=data;
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }


  get displayedforumPosts() {
    return this.showAllPosts ? this.forumPosts : this.forumPosts.slice(0, this.currentdisplayedposts);
  }

  openPost(postid:any){

  }
   // Delete post by id
  deletePost(postId: any): void {
    this.forumPosts = this.forumPosts.filter((post :any)=> post.post_id !== postId);
  }
  EditPost(postId: any): void {
    let post = this.forumPosts.find((post :any) => post.post_id  == postId);
  }
}
