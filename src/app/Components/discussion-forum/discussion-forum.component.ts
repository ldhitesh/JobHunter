import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';



@Component({
  selector: 'discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css']
})
export class DiscussionForumComponent {
  forumPosts:any = [];
  showAllPosts = false;
  currentdisplayedposts=2;

    constructor(private http:HttpClient,private router:Router,
                public authService:AuthService,
                private activatedRoute:ActivatedRoute){                  
                }

    
  ngOnInit(): void {
    this.fetchposts();
  }

  opencreatepostform(): void {
      this.router.navigate(['/createpost'],{queryParams:{
        prevUrl:this.router.url }
      });
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
    this.http.delete(`http://localhost:80/api/discussion/deletepost/${postId}`).subscribe({
      next:(response:any) => {
        this.forumPosts = this.forumPosts.filter((post :any) => post.post_id  !== postId);

        this.router.navigate([this.router.url],{queryParams:{
          prevUrl:this.router.url }
        }); 
    },
    error:(err:any) => {
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
      this.router.navigate(['/discussionforum']);     
    }
  });
  
  }

  EditPost(postId: any): void {
    let post =this.forumPosts.find((x:any)=>x.post_id=postId);    
    this.router.navigate(['/createpost'],{queryParams:{
      postdata:JSON.stringify(post),operation:"Edit",
      prevUrl:this.router.url }})
  }

}
