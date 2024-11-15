import { Component } from '@angular/core';

@Component({
  selector: 'login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  loginCredential={
    email:'',
    password:''
  };

  onLogin(data:any){
  }
}
