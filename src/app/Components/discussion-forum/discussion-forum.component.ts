import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
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
  updatecreateformbtn:any=false;
  createformtitle="Create a Post";
  singleReplyData:any;
  menuOpen = false;
  showModal = false; 
  newPost:any = {
    title: '',
    author: this.authService.username,
    summary: '',
    posted_date: new Date(),
    user_id:this.authService.email,
    postprofilepic:this.authService.profilepicture,
    post_id:''
    }
  defaultProfilePic = 'assets/NoProfileImage.png'; // Path to your fallback image

    constructor(private http:HttpClient,private router:Router,
                public authService:AuthService,
                private activatedRoute:ActivatedRoute){    
                     
                }

    
  ngOnInit(): void {
    this.fetchposts();
    if(sessionStorage.getItem('Token')){
      this.authService.setUserDetails();
    }
  }

  opencreatepostform(): void {
    this.showModal=true;
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

   
   
  createPost(): void {
    const PostData={
    "author":sessionStorage.getItem('Token')?this.authService.getUserDetails().unique_name: this.authService.username,
    "posted_date": new Date(),
    "user_id":sessionStorage.getItem('Token')?this.authService.getUserDetails().email:this.authService.email,
    "postprofilepic":sessionStorage.getItem('Token')? "/assets/NoProfileImage.png":this.authService.profilepicture,
    "title":this.newPost.title,
    "summary":this.newPost.summary
    }
    this.http.post('http://localhost:80/api/discussion/addpost',PostData).subscribe({
      next:(response:any)=>{
        this.fetchposts();
        this.showModal = false;
        this.clearCreateForm();
        this.createformtitle="Create a Post";
      },
      error:(err:any)=>{       
        const errorMessage = err.error?.message || 'An unexpected error occurred.';
        this.createformtitle="Create a Post";
        this.clearCreateForm();


      }
    })
  }
  onEditPost(postId: any): void {
    this.showModal=true;
    this.updatecreateformbtn=true;
    this.createformtitle="Update a Post";
    const post = this.forumPosts.find((p:any) => p.post_id === postId);
    this.newPost.title=post.title
    this.newPost.summary=post.summary
    this.newPost.author=this.authService.username
    this.newPost.posted_date= new Date()
    this.newPost.user_id=this.authService.email
    this.newPost.postprofilepic=this.authService.profilepicture
    this.newPost.post_id=post.post_id;
}

  onEditPostSubmit(postId:any){
        this.http.patch(`http://localhost:80/api/discussion/updatepost/${postId}`,this.newPost).subscribe({
          next:(response:any) => {
            this.showModal=false;
            this.updatecreateformbtn=false;
            this.createformtitle="Create a Post";
            this.fetchposts();
            this.clearCreateForm();
        },
        error:(err:any) => {      
          const errorMessage = err.error?.message || 'An unexpected error occurred.';
          this.createformtitle="Create a Post";
          this.clearCreateForm();
        }
      });
    }

  onDeletePost(postId: any): void {
    this.http.delete(`http://localhost:80/api/discussion/deletepost/${postId}`).subscribe({
      next:(response:any) => {
        this.forumPosts = this.forumPosts.filter((post :any) => post.post_id  !== postId);
        this.menuOpen = false;
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

 

  openReply(postindex:any){
    this.showreplymodal=true;
    this.postindex=postindex;
  }

  submitReply(postId:any): void {
    const replydata={
      "post_id": postId,
      "user_id": this.authService.email,
      "reply_summary": this.replyContent,
      "replied_on": new Date(),
      "username":this.authService.username,
      "replyprofilepic":this.authService.profilepicture 
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
  }

  UpdateReply(){
   this.singleReplyData.reply_summary=this.replyContent;
    this.http.patch(`http://localhost:80/api/discussion/updatereply/${this.singleReplyData.reply_id}`,this.singleReplyData).subscribe({
    next:(response:any) => {
      let post=this.forumPosts.find((p:any) => p.post_id === this.singleReplyData.post_id);
      let reply= post.replies.find((r:any)=>r.reply_id==this.singleReplyData.reply_id);
      reply=this.singleReplyData;
      this.replyContent='';
      this.singleReplyData='';
      this.updatebtn=false;
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
         this.closeModal();
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

  createformCloseModal(event: MouseEvent): void {
    const modalContent = document.querySelector('.createform-modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
      this.showModal = false;
      this.createformtitle="Create a Post";
      this.clearCreateForm();
    }
  }


  toggleMenu(event: MouseEvent,postindex:any) {
    event.stopPropagation(); 
    this.menuOpen = !this.menuOpen;
    this.postindex=postindex;
  }

  setDefaultImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultProfilePic;
  }

  @HostListener('document:click')
  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }

  clearCreateForm(){
    this.newPost.title=''
    this.newPost.summary=''
    this.newPost.author=''
    this.newPost.posted_date= ''
    this.newPost.user_id=''
    this.newPost.postprofilepic=''
    this.createformtitle="Create a Post";

  }
  
}
