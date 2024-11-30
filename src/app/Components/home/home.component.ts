import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  IsloggedIn:boolean=false;
  UserRole:any;
  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.loginstatuscheckservice.isLoggedIn.subscribe(state => {
      this.IsloggedIn = state;
    });

    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(localStorage.getItem('UserName')){
      this.IsloggedIn=true;
      this.UserRole=localStorage.getItem('Role');
    }

  }

  Logout(){
    localStorage.removeItem('UserName');
    localStorage.removeItem('Role');
    this.router.navigate(['/login']);
    this.IsloggedIn=false;
    this.UserRole='';
  }

}
