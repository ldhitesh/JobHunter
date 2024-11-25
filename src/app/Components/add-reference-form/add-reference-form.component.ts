import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-reference-form',
  templateUrl: './add-reference-form.component.html',
  styleUrls: ['./add-reference-form.component.css']
})
export class AddReferenceFormComponent {

  public referenceform:FormGroup;
  public updatebtn:boolean=false;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute)
  {
      this.referenceform= this.fb.group({
      name:[''],
      organization:[''],
      position:[''],
      email:[''],
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
      
    });
  }

  Onsubmit(){
    
    this.http.post('http://localhost:5018/api/companies/addcompany',this.referenceform.value).subscribe({
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

  }

  Delete(){

  }
}
