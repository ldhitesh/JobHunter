import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
    selector: 'login-component',
    templateUrl: './login-component.component.html',
    styleUrls: ['./login-component.component.css'],
    standalone: false
})
export class LoginComponentComponent {

  public loginCredential={
    username:'',
    password:''
  };

  public IsloggedIn:boolean=false;
  public successfullogin: boolean = false;
  public loginfailure: boolean = false;
  public duplicateemail: boolean=false;
  public isModalVisible:boolean=false;
  public registerResponse:any;
  public invalidCredentials=false;

  constructor(private http: HttpClient,
              private router: Router,
              private loginstatuscheckservice:LoginStatusCheckServiceService,
              private activatedroute: ActivatedRoute,
              private authservice:AuthService,
              private notificationService: NotificationServiceService,
            ) {}

  
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
        this.registerResponse=params['response'];  
        this.showNotification();     
      });
  }

onLogin(){
  this.http.post('http://localhost:80/api/login', this.loginCredential).subscribe({
    next: (response: any) => {        
      sessionStorage.setItem('Token', response.token);
      this.authservice.setUserDetails();

      this.loginstatuscheckservice.login(); 
      this.loginstatuscheckservice.RoleCheck(this.authservice.userRole);
      
      this.router.navigate(['/home']); 
    },
    error: (err) => {  
      const err_message=err.error.message;
      if(err_message=="Your account is waiting for approval.")  {
        this.notificationService.showNotification('Email Approval Waiting!');
      }
      else if(err_message=="Account verification is required."){
        this.notificationService.showNotification('Email verification pending!');
      }
      else{
        this.invalidCredentials=true;
      }
      setTimeout(() =>  {
                          this.invalidCredentials = false; 
                        }, 3000);        
                    }
    });
  }

onSingleSignOnLogin(){
  this.authservice.authlogin();
}


showNotification() {
  const responseMap:any = {
    "Success": () => this.successfullogin = true,
    "Failure": () => this.loginfailure = true,
    "Duplicate": () => this.duplicateemail = true
  };

  if (responseMap[this.registerResponse]) {
      responseMap[this.registerResponse]();
  }
  this.isModalVisible=true;

  setTimeout(() => {
      this.isModalVisible = false; 
      this.registerResponse='';
  }, 10000);
}

}
