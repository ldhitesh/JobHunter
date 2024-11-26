import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  public isModalVisible: boolean = false;
  registerform!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){
    this.registerform=this.fb.group({
      username:[''],
      email:[''],
      password:['']
    });
  }
  OnRegister(){
      
    this.openpopupwindow();
      this.http.post('http://localhost:5018/api/register/pendingregistrations',this.registerform.value).subscribe({
        next:(response:any)=>{
          this.isModalVisible = true;  
        },
        error:(err:any)=>{
          alert('Could not register the user!');
          this.router.navigate(['/login']); 
        }
      })
    }

  openpopupwindow(){
      this.isModalVisible = true;            
  }
  closeModal() {
    this.isModalVisible = false;
    this.router.navigate(['/login']);           

  }
 


}

