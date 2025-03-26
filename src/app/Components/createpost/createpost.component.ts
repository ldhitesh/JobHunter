import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {

  showModal = true; 
  @Input() postCreated = false;  // Emit new post to the parent component

  constructor(  
                private router: Router,private http:HttpClient,
                private authService:AuthService,
                private activatedroute:ActivatedRoute
                
              ) {

                
              }
    updatepostdata:any
    crudoperation:any
    buttonName:any="Create Post"
    formtitle:any="Create a Post"
    prevUrl:any;

   newPost:any = {
                  title: '',
                  author: this.authService.username,
                  summary: '',
                  posted_date: new Date(),
                  user_id:this.authService.email,
                  postprofilepic:this.authService.profilepicture,
                  post_id:''
                }

  ngOnInit(): void {

    this.activatedroute.queryParams.subscribe(params => {
   
      if (params['postdata']) {
          this.updatepostdata = JSON.parse(params['postdata']); 
          this.newPost.title=this.updatepostdata.title;
          this.newPost.summary=this.updatepostdata.summary;
          this.newPost.author=this.updatepostdata.author;
          this.newPost.user_id=this.updatepostdata.user_id;
          this.newPost.posted_date=new Date();
          this.newPost.post_id=this.updatepostdata.post_id
      } 
      if(params['operation']){
        this.crudoperation=params['operation'];
      }         
      if(this.crudoperation=="Edit"){
        this.buttonName="Update Post";
        this.formtitle="Update a Post"
      }
      if(params['prevUrl']){
        this.prevUrl=params['prevUrl']
      }
    });    
  }
  
  createPost(): void {

    if(this.crudoperation=="Edit"){
      this.http.patch(`http://localhost:80/api/discussion/updatepost/${this.updatepostdata.post_id}`,this.newPost).subscribe({
        next:(response:any) => {
        this.router.navigate([this.prevUrl]); // Navigate after update
        this.newPost='';
      },
      error:(err:any) => {      
        const errorMessage = err.error?.message || 'An unexpected error occurred.';
        this.newPost='';
        alert(errorMessage);   
                this.router.navigate([this.prevUrl]); // Navigate after update

      }
    });
    }
    else{
        this.buttonName="Create Post"
        this.http.post('http://localhost:80/api/discussion/addpost',this.newPost).subscribe({
          next:(response:any)=>{
            this.postCreated=false;
            this.newPost='';
            this.router.navigate([this.prevUrl]);
            },
          error:(err:any)=>{       
            const errorMessage = err.error?.message || 'An unexpected error occurred.';
            this.newPost='';
            alert(errorMessage);   
            this.router.navigate([this.prevUrl]); 
          }
        })

    
    }
  }

  closeModal(event: MouseEvent): void {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
      this.showModal = false;
      this.router.navigate([this.prevUrl]);
      this.updatepostdata=''
      this.newPost=''
    }
  }
}