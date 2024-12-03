import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  public registerResponseDetails:any;
  public allowToRegister:any;

  registerform!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute,private toastr: ToastrService
  ){
    this.registerform=this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      paymentstatus:['']
    });
  }

  ngOnInit(): void {    
    this.activatedroute.queryParams.subscribe(params => {
      if(params['registerdetails']=="fail"){
        this.showNotification(this.registerResponseDetails,'fail')
      }
      else{
        this.registerResponseDetails = JSON.parse(decodeURIComponent(params['registerdetails']));
        this.showNotification(this.registerResponseDetails,'success')
      }
    });

  }



  showNotification(registerDetails:any,status:any) {
    this.registerResponse=status;

    if(status=='success'){
      this.allowToRegister=true;    
      this.registerform.patchValue({
        username: registerDetails.Username,
        email: registerDetails.Email,
        password: registerDetails.Password,
        paymentstatus: "Completed(Verify-Transaction)"
      }); 
    }   
  }


  OnRegister(){      
      this.http.post('http://localhost:5018/api/register/pendingregistrations',this.registerform.value).subscribe({
        next:(response:any)=>{
          this.router.navigate(['/login'],{
            queryParams: {
              response: "Success"
            }
          });   
          this.allowToRegister=false;     
        },
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

