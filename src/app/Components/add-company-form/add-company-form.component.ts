import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.css']
})
export class AddCompanyFormComponent {
  public companyform:FormGroup;

  constructor(private fb:FormBuilder){
    this.companyform= this.fb.group({
      organization:[''],
      description:[''],
      lastapplied:[''],
      status:['']
    })
  }


  Onsubmit(){
    
  }

}
