import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
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
  IsverifiedLink:boolean=false;
  UserRole:any;
  IsHomePage: boolean = false; 
  notificationMessage: string='';
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse: any;

  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
              private router:Router,private renderer: Renderer2,private notificationService: NotificationServiceService
  ){}


  onNavItemClick() {
    this.renderer.removeClass(this.navbarCollapse.nativeElement, 'show');
  }
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
    if(sessionStorage.getItem('UserName')){
      this.IsloggedIn=true;
      this.UserRole=sessionStorage.getItem('Role');
    }
    this.IsHomePage = this.router.url === '/home'; // You can change '/home' if your home route is different
    
  }

  Logout(){
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('Role');
    this.router.navigate(['/login']);
    this.IsloggedIn=false;
    this.loginstatuscheckservice.logout();
    this.UserRole='';
  }

  closeModal(){
    this.notificationMessage='';
  }

}
