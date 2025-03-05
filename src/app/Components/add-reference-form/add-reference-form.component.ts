import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-reference-form',
  templateUrl: './add-reference-form.component.html',
  styleUrls: ['./add-reference-form.component.css']
})
export class AddReferenceFormComponent {

  public referenceform:FormGroup;
  public updatebtn:boolean=false;
  public currentrefereremail:string='';
  public currentreferncedetails:any;
  public isUpdateForm:boolean=false;
  public isDeleteForm:boolean=false;
  
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute)
  {
      this.referenceform= this.fb.group({
      name:['',Validators.required],
      organization:['',Validators.required],
      position:['',Validators.required],
      email:['',Validators.required],
      link:['']
    })
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.referenceform = this.fb.group({
        name: [params['name'] || ''],
        organization: [params['organization'] || ''],
        position: [params['position'] || ''],
        email: [params['email'] || ''],
        link: [params['link'] || ''],
      });
      
      this.updatebtn=params['button']=="update"?true:false;
      this.currentrefereremail=params['email'];
    });
    this.currentreferncedetails=this.referenceform.value;

  }

  Onsubmit(){
    this.trimWhiteSpaces();    
    this.http.post('http://localhost:80/api/references/addreference',this.referenceform.value).subscribe({
      next:(response:any)=>{
        this.router.navigate(['/references']); 
      },
      error:(err:any)=>{       
        const errorMessage = err.error?.message || 'An unexpected error occurred.';
        alert(errorMessage);   
        this.router.navigate(['/addreferenceform']); 
      }
    })
  }

 
  Update(){
    this.trimWhiteSpaces();
    this.http.patch(`http://localhost:80/api/references/updatereference/${this.currentrefereremail}`,this.referenceform.value).subscribe({
      next:(response:any) => {
      this.router.navigate(['/references']); // Navigate after update
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
  });
  }

  Delete(){
    this.http.delete(`http://localhost:80/api/references/deletereference/${this.referenceform.value.email}`).subscribe({
      next:(response:any) => {
      this.router.navigate(['/references']); // Navigate after update
    },
    error:(err:any) => {
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
      this.router.navigate(['/references']);     
    }
  });
  }

  checkForValueChange(){
    return (this.referenceform.value.email!=this.currentreferncedetails.email ||
    this.referenceform.value.name!=this.currentreferncedetails.name ||
    this.referenceform.value.position!=this.currentreferncedetails.position ||
    this.referenceform.value.organization!=this.currentreferncedetails.organization )&& 
    (this.referenceform.value.organization.length!=0 &&
    this.referenceform.value.name.length!=0  && this.referenceform.value.position.length!=0 &&
    this.referenceform.value.email.length!=0)
  }

  trimWhiteSpaces(){
    this.referenceform.value.organization=this.referenceform.value.organization.trim();
    this.referenceform.value.name=this.referenceform.value.name.trim();
    this.referenceform.value.position=this.referenceform.value.position.trim();
    this.referenceform.value.email=this.referenceform.value.email.trim();    
  }


  ConfirmUpdate(){
    this.isUpdateForm=true;
  }

  ConfirmDelete(){
    this.isDeleteForm=true;
  }

  closeModal(){
    this.isUpdateForm=false;
    this.isDeleteForm=false;
  }
}
