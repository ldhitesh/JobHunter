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
  }

  Onsubmit(){
    console.log(this.referenceform.value);
    
    this.http.post('http://localhost:5018/api/references/addreference',this.referenceform.value).subscribe({
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
    console.log(this.referenceform.value);
    console.log(this.currentrefereremail);
    
    
    this.http.patch(`http://localhost:5018/api/references/updatereference/${this.currentrefereremail}`,this.referenceform.value).subscribe({
      next:(response:any) => {
      alert('Referer updated successfully!');
      this.router.navigate(['/references']); // Navigate after update
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
  });
  }

  Delete(){
    this.http.delete(`http://localhost:5018/api/references/deletereference/${this.referenceform.value.email}`).subscribe({
      next:(response:any) => {
      alert('Referer deleted successfully!');
      this.router.navigate(['/references']); // Navigate after update
    },
    error:(err:any) => {
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
      this.router.navigate(['/references']);     
    }
  });
  }
}
