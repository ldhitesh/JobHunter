import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  loginCredential={
    username:'',
    password:''
  };
  public IsloggedIn=false;
  public successfullogin: boolean = false;
  public loginfailure: boolean = false;
  public isModalVisible:boolean=false;
  public registerResponse:any;
  public sessionId:any;
  public duplicateemail: any;


  constructor(private http: HttpClient,
              private router: Router,
              private loginstatuscheckservice:LoginStatusCheckServiceService,
              private activatedroute: ActivatedRoute,) {}

  
  ngOnInit(): void {
    
    this.activatedroute.queryParams.subscribe(params => {
        this.registerResponse=params['response'];  
        this.showNotification();     
      });
  }

  onLogin(data:any){
      const loginData = this.loginCredential;
      this.http.post('http://localhost:80/api/login', loginData).subscribe({
        next: (response: any) => {          
          sessionStorage.setItem('UserName', response.userDetails.username);
          sessionStorage.setItem('Role', response.userDetails.role[0]);
          this.loginstatuscheckservice.login();
          this.loginstatuscheckservice.RoleCheck(response.userDetails.role[0]);
          this.router.navigate(['/home']);  
        },
        error: (err) => {
          alert('Invalid username or password!');
        }
      });
  }


  showNotification() {
    if(this.registerResponse=="Success"){
      this.successfullogin=true;
      this.isModalVisible=true;
    }
    else if(this.registerResponse=="Failure"){
      this.loginfailure=true;
      this.isModalVisible=true;
    }  
    else if(this.registerResponse=="Duplicate"){
      this.duplicateemail=true;
      this.isModalVisible=true;
    } 
   
    setTimeout(() => {
        this.isModalVisible = false; 
        this.loginfailure=false;
        this.successfullogin=false;
        this.registerResponse='';
    }, 10000);
  }
}
