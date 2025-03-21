import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  IsloggedIn:boolean=false;
  UserRole:any;
  profilepicture:any;

  
    constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
                private router:Router,private renderer: Renderer2,
                public authService:AuthService
    ){
      this.profilepicture=authService.profilepicture;
    }


  ngOnInit(): void {    
    this.loginstatuscheckservice.isLoggedIn.subscribe(state => {
      this.IsloggedIn = state;
    });

    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    
    if(sessionStorage.getItem('id_token')){
      this.IsloggedIn=true;
      this.UserRole=this.authService.userRole;
    }
    else if(sessionStorage.getItem('Role')){
      this.IsloggedIn=true;
      this.UserRole=sessionStorage.getItem('Role');
    }    
  }

  Logout(){
    this.authService.profilepicture="";
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('Role');
    this.router.navigate(['/login']);
    this.IsloggedIn=false;
    this.loginstatuscheckservice.logout();
    this.UserRole='';
    this.authService.logout();
  }
}
