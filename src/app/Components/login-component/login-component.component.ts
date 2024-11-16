import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  

  constructor(private http: HttpClient,private router: Router) {}


  onLogin(data:any){
    
      const loginData = this.loginCredential;

      console.log(loginData);

      this.http.post('http://localhost:5018/api/login/login', loginData).subscribe({
        next: (response: any) => {
          localStorage.setItem('jwtToken', response.token);
          alert('Login successful!');
          this.router.navigate(['/companiescomponent']); 
        },
        error: (err) => {
          alert('Invalid username or password!');
          console.error(err);
        }
      });
  }
}
