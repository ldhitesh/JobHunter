import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'add-company',
  templateUrl: './add-company-button.component.html',
  styleUrls: ['./add-company-button.component.css']
})
export class AddCompanyButtonComponent {
  UserRole:any;
  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
              private authService:AuthService
  ){}

  ngOnInit(): void {
    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(sessionStorage.getItem('id_token')){
      this.UserRole=this.authService.userRole;
    }
    else if(sessionStorage.getItem('Role')){
      this.UserRole=sessionStorage.getItem('Role');
    }
  }
}
