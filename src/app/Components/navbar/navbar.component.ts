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
    ){}


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
    else if(sessionStorage.getItem('Token')){
      this.IsloggedIn=true;
      this.UserRole=this.authService.getUserDetails().role;
    }    
  }

  Logout(){
    this.authService.profilepicture="";
    this.IsloggedIn=false;
    this.UserRole='';
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  defaultProfilePic = 'assets/NoProfileImage.png'; // Path to your fallback image

  setDefaultImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultProfilePic;
  }
}
