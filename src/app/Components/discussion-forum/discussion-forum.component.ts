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
  replyContent: string = '';
  showreplymodal:any;
  postindex:any;
  updatebtn:any=false;
  singleReplyData:any;

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

  openReply(postindex:any){
    this.showreplymodal=true;
    this.postindex=postindex;
  }


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

  submitReply(postId:any): void {
    const replydata={
      "post_id": postId,
      "user_id": this.authService.email,
      "reply_summary": this.replyContent,
      "replied_on": new Date(),
      "username":this.authService.username 
    }
    this.http.post('http://localhost:80/api/discussion/addreply',replydata).subscribe({
      next:(response:any) => {
        const post = this.forumPosts.find((p:any) => p.post_id === postId);
        if (post) {
          post.replies = post.replies
          post.replies.push(response.reply);          
        }
        this.closeModal();
        this.replyContent='';
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert("Could save the reply!")
    }
  });
  }

  EditReply(replyId:any,postId:any,postindex:any){
    this.updatebtn=true;
    this.openReply(postindex);
    let post=this.forumPosts.find((p:any) => p.post_id === postId);
    this.singleReplyData=post.replies.find((r:any)=>r.reply_id==replyId);
    this.replyContent= this.singleReplyData.reply_summary;
    console.log(this.singleReplyData);
    
  }

  UpdateReply(){

   this.singleReplyData.reply_summary=this.replyContent;
    
    this.http.patch(`http://localhost:80/api/discussion/updatereply/${this.singleReplyData.reply_id}`,this.singleReplyData).subscribe({
    next:(response:any) => {
      let post=this.forumPosts.find((p:any) => p.post_id === this.singleReplyData.post_id);
      let reply= post.replies.find((r:any)=>r.reply_id==this.singleReplyData.reply_id);
      reply=this.singleReplyData;
      this.replyContent='';
      this.closeModal()
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
    });
  }

  deleteReply(replyId:any,postId:any){
 
    this.http.delete(`http://localhost:80/api/discussion/deletereply/${replyId}`).subscribe({
      next:(response:any) => 
        {
        let post=this.forumPosts.find((p:any) => p.post_id === postId);
         post.replies= post.replies.filter((r:any)=>r.reply_id!==replyId);
        },
        error:(err:any) => {
          const errorMessage = err.error?.message || 'An unexpected error occurred.';
          alert(errorMessage);   
        }
    });
  }

  closeModal(): void {
      this.showreplymodal = false;
      this.replyContent='';
  }

}
