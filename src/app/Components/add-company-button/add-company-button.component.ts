import { Component } from '@angular/core';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'add-company',
  templateUrl: './add-company-button.component.html',
  styleUrls: ['./add-company-button.component.css']
})
export class AddCompanyButtonComponent {
  UserRole:any;
  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService
  ){}

  ngOnInit(): void {
    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(localStorage.getItem('Role')){
      this.UserRole=localStorage.getItem('Role');
    }

  }
}
