import { Component } from '@angular/core';
import { Alert } from 'bootstrap';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'app-email-verification-complete',
  templateUrl: './email-verification-complete.component.html',
  styleUrls: ['./email-verification-complete.component.css']
})
export class EmailVerificationCompleteComponent {

  
  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService){}

ngOnInit(): void {
   // this.loginstatuscheckservice.verifiedlink();
}

}
