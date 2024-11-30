import { Component } from '@angular/core';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'add-reference-button',
  templateUrl: './add-reference-button.component.html',
  styleUrls: ['./add-reference-button.component.css']
})
export class AddReferenceButtonComponent {
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
