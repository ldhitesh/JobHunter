import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {
  IsloggedIn:boolean=false;
  UserRole:any;
  profilepicture:any;
  notificationMessage: string='';
  companyCards:any;

  constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
              public authService:AuthService,
              private http:HttpClient
  ){
    this.profilepicture=authService.profilepicture;
    this.getCompanyCards();
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
    else if(sessionStorage.getItem('Token')){
      this.IsloggedIn=true;
      this.UserRole=this.authService.getUserDetails().role;
    }
    
  }
  getCompanyCards():any{
    this.http.get("/assets/data/companyCards.json").subscribe({
      next:(response:any) => {
        this.companyCards=response.companies
      },
      error:(err:any) => {      
        console.log(err)
      }
    })
  }

}
