import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.css']
})
export class AddCompanyFormComponent {
  public companyform:FormGroup;
  public updatebtn:boolean=false;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute)
  {
      this.companyform= this.fb.group({
      organization:[''],
      description:[''],
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
      
    });
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

  }

  Delete(){

  }
}
