import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
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
  public isUpdateForm:boolean=false;
  public isDeleteForm:boolean=false;

  @Output() onClose: EventEmitter<void> = new EventEmitter();  // Event to notify when modal is closed
  @Output() onConfirm: EventEmitter<void> = new EventEmitter(); 

  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute)
  {
      this.companyform= this.fb.group({
      organization: ['', Validators.required], 
      description: ['No Comments', Validators.required], 
      lastapplied:['Yet to Apply'],
      status:[false],
      link:[""]
    })
  }

  ngOnInit(): void {
    
    this.activatedroute.queryParams.subscribe(params => {
      this.companyform = this.fb.group({
        organization: [params['organization'] || ''],
        description: [params['description'] || ''],
        lastapplied: [params['lastapplied'] ||'Yet to Apply' ],
        status: [params['status']||'Not Applied'] ,
        link:[params['link'] || 'Link Not Added']
      });
      
      this.updatebtn=params['button']=="update"?true:false;
      this.currentorganization=params['organization'];
      if( this.companyform.value.lastapplied!='Yet to Apply'){
        this.companyform.patchValue({
          lastapplied: new Date(params['lastapplied']).toISOString().split('T')[0],
        });
      }
      this.currentcompanydetails=this.companyform.value;

    });
    
    }


  Onsubmit(){
    this.trimWhiteSpaces();
    
    this.companyform.value.lastapplied=this.companyform.value.lastapplied=="Yet to Apply"
                                      ?this.companyform.value.lastapplied
                                      :new Date(this.companyform.value.lastapplied + 'T00:00:00').toString().slice(4,15);
    this.companyform.value.status=this.companyform.value.lastapplied=="Yet to Apply"?"Not Applied":"Applied";
    
    this.http.post('http://localhost:80/api/companies/addcompany',this.companyform.value).subscribe({
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
                                      : new Date(this.companyform.value.lastapplied + 'T00:00:00').toString().slice(4,15);
        
    this.companyform.value.lastapplied=this.companyform.value.lastapplied.length==0
                                        ? "Yet to Apply"
                                        :this.companyform.value.lastapplied;
    if(this.companyform.value.lastapplied=="Yet to Apply")
      this.companyform.value.status=false;
    
    

    this.companyform.value.status=this.companyform.value.status==false?"Not Applied":"Applied";

    this.http.patch(`http://localhost:80/api/companies/updatecompany/${this.currentorganization.trim()}`,this.companyform.value).subscribe({
      next:(response:any) => {
      this.isUpdateForm=false;
      this.router.navigate(['/companieslist']); // Navigate after update
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
  });
  }

  Delete(){
    this.http.delete(`http://localhost:80/api/companies/deletecompany/${this.companyform.value.organization}`).subscribe({
      next:(response:any) => {
      this.isDeleteForm=false;
      this.router.navigate(['/companieslist']); // Navigate after update
    },
    error:(err:any) => {
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
      this.router.navigate(['/companieslist']);     
    }
  });
  }

  checklastapplieddirty(){
    if(this.currentcompanydetails.lastapplied!='Yet to Apply'){
      const date1 = new Date(this.companyform.value.lastapplied+ 'T00:00:00').toString().slice(4,15); 
      const date2 = new Date(this.currentcompanydetails.lastapplied+ 'T00:00:00').toString().slice(4,15); 
      if(date1!= date2){
        return true;
      }
    }
    else if(this.currentcompanydetails.lastapplied=='Yet to Apply'){
      if(this.companyform.value.lastapplied.length==0 || this.companyform.value.lastapplied=='Yet to Apply' ){
        return false;
      }
      else{
        return true;
      }
    }
    return;
  }

  checkForValueChange(){
      
      return (this.companyform.value.organization!=this.currentcompanydetails.organization ||
      this.companyform.value.description!=this.currentcompanydetails.description ||
      this.checklastapplieddirty()||
      this.companyform.value.status!=this.currentcompanydetails.status) && 
      (this.companyform.value.organization.length!=0 &&
      this.companyform.value.description.length!=0 )
  }

  trimWhiteSpaces(){
    this.companyform.value.organization=this.companyform.value.organization.trim();
    this.companyform.value.description=this.companyform.value.description.trim();
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
