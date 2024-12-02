import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  public successfullogin: boolean = false;
  public loginfailure: boolean = false;
  public isModalVisible:boolean=false;
  public registerResponse:any;

  registerform!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute
  ){
    this.registerform=this.fb.group({
      username:[''],
      email:[''],
      password:['']
    });
  }

  ngOnInit(): void {
    
    this.activatedroute.paramMap.subscribe(params => {
      this.registerResponse = params.get('status');
      this.showNotification();
    });

  }



  showNotification() { 
    setTimeout(() => {
        this.registerResponse='';
    }, 8000);
  }
  OnRegister(){      
      this.http.post('http://localhost:5018/api/register/pendingregistrations',this.registerform.value).subscribe({
        next:(response:any)=>{
          this.router.navigate(['/login'],{
            queryParams: {
              response: "Success"
            }
          });        },
        error:(err:any)=>{          
          this.router.navigate(['/login'],{
            queryParams: {
              response: "Failure"
            }
          });         
        }
      })
    }


}

