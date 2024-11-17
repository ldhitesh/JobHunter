import { Component, EventEmitter, Output } from '@angular/core';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  IsloggedIn:boolean=false;

  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService){}

  ngOnInit(): void {
    this.loginstatuscheckservice.isLoggedIn.subscribe(state => {
      this.IsloggedIn = state;
    });
  }

}
