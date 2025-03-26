import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'add-reference-button',
  templateUrl: './add-reference-button.component.html',
  styleUrls: ['./add-reference-button.component.css']
})
export class AddReferenceButtonComponent {
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
    else if(sessionStorage.getItem('Token')){
      this.UserRole=this.authService.getUserDetails().role;
    }

  }
}
