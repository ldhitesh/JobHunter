import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  IsloggedIn:boolean=false;
  UserRole:any;
  IsHomePage: boolean = false; 
  notificationMessage: string='';

  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
              private router:Router,private notificationService: NotificationServiceService
  ){}

  ngOnInit(): void {
    
    this.loginstatuscheckservice.isLoggedIn.subscribe(state => {
      this.IsloggedIn = state;
    });

    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
    });

    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(localStorage.getItem('UserName')){
      this.IsloggedIn=true;
      this.UserRole=localStorage.getItem('Role');
    }
    this.IsHomePage = this.router.url === '/home'; // You can change '/home' if your home route is different
    
  }

  Logout(){
    localStorage.removeItem('UserName');
    localStorage.removeItem('Role');
    this.router.navigate(['/login']);
    this.IsloggedIn=false;
    this.UserRole='';
  }

  closeModal(){
    this.notificationMessage='';
  }

}
