import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.css']
})
export class AddCompanyFormComponent {
  public companyform:FormGroup;
  public updatebtn:boolean=false;
  public currentorganization:string='';
  public currentcompanydetails:any;

  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute)
  {
      this.companyform= this.fb.group({
      organization: ['', Validators.required],  // Add required validator
      description: ['', Validators.required], 
      lastapplied:['Yet to Apply'],
      status:[false]
    })
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.companyform = this.fb.group({
        organization: [params['organization'] || ''],
        description: [params['description'] || ''],
        lastapplied: [params['lastapplied'] ||'Yet to Apply' ],
        status: [params['status'] === 'Applied'] 
      });

      this.updatebtn=params['button']=="update"?true:false;
      this.currentorganization=params['organization'];
      this.currentcompanydetails=this.companyform.value;
    });
  }

  lastappliedfunction(){
    if(this.companyform.value.lastapplied.length==0)
      this.companyform.value.lastapplied='Yet to Apply';    
  }

  Onsubmit(){
    
    this.companyform.value.lastapplied=this.companyform.value.lastapplied=="Yet to Apply"
                                      ?this.companyform.value.lastapplied
                                      :this.companyform.value.lastapplied.toString().slice(0,10);
    this.companyform.value.status=this.companyform.value.status==false?"Not Applied":"Applied";

    this.http.post('http://localhost:5018/api/companies/addcompany',this.companyform.value).subscribe({
      next:(response:any)=>{
        this.router.navigate(['/companieslist']); 
      },
      error:(err:any)=>{       
        const errorMessage = err.error?.message || 'An unexpected error occurred.';
        alert(errorMessage);   
        this.router.navigate(['/addcompanyform']); 
      }
    })
  }

  Update(){

    this.companyform.value.lastapplied=this.companyform.value.lastapplied=="Yet to Apply"
                                      ?this.companyform.value.lastapplied
                                      :this.companyform.value.lastapplied.toString().slice(0,10);
    this.companyform.value.status=this.companyform.value.status==false?"Not Applied":"Applied";

    
    this.http.patch(`http://localhost:5018/api/companies/updatecompany/${this.currentorganization}`,this.companyform.value).subscribe({
      next:(response:any) => {
      alert('Company updated successfully!');
      this.router.navigate(['/companieslist']); // Navigate after update
    },
    error:(err:any) => {
      console.log(err);
      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
  });
  }

  Delete(){
    this.http.delete(`http://localhost:5018/api/companies/deletecompany/${this.companyform.value.organization}`).subscribe({
      next:(response:any) => {
      alert('Company deleted successfully!');
      this.router.navigate(['/companieslist']); // Navigate after update
    },
    error:(err:any) => {
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
      this.router.navigate(['/companieslist']);     
    }
  });
  }
}
