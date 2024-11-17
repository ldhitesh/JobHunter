import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  


  constructor(private http: HttpClient,private router: Router,private loginstatuscheckservice:LoginStatusCheckServiceService) {}


  onLogin(data:any){
    
      const loginData = this.loginCredential;
      this.http.post('http://localhost:5018/api/login', loginData).subscribe({
        next: (response: any) => {
          localStorage.setItem('jwtToken', response.token);
          this.loginstatuscheckservice.login();
          this.router.navigate(['/companiescomponent']); 
        },
        error: (err) => {
          alert('Invalid username or password!');
        }
      });
  }
}
