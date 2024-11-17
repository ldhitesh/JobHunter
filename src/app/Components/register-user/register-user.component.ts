import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  
  registerform!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){
    this.registerform=this.fb.group({
      username:[''],
      email:[''],
      password:['']
    });
  }


  OnRegister(){
    
    this.http.post('http://localhost:5018/api/register',this.registerform.value).subscribe({
      next:(response:any)=>{
        alert('Registered successfully!');
        this.router.navigate(['/login']); 
      },
      error:(err:any)=>{
        alert('Could not register the user!');
        this.router.navigate(['/login']); 
      }
    })
  }


}

