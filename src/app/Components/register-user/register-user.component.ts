import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

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
  public emailVerificationData = { to: '', subject: '', body: '' };

  registerform!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute,private toastr: ToastrService,
              private notificationService: NotificationServiceService)
  {
    this.registerform=this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      paymentstatus:[''],
      verificationtoken:[''],
      accountverificationstatus:['']
    });
  }

  ngOnInit(): void {    
    this.activatedroute.queryParams.subscribe(params => {
      if(params['registerdetails']=="fail"){
        this.showNotification(this.registerResponseDetails,'fail')
      }
      else{
        this.registerResponseDetails = JSON.parse(decodeURIComponent(params['registerdetails']));
        this.showNotification(this.registerResponseDetails,'Success')
      }
    });

  }

  showNotification(registerDetails:any,status:any) {
    this.registerResponse=status;

    if(status=='Success'){
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
      this.emailVerificationData.to=this.registerform.value.email;
      this.emailVerificationData.subject="Please Verify Your Email Address to Complete Registration"
      this.emailVerificationData.body=this.registerform.value.username;
      const requestBody = {
        RegisterData: this.registerform.value,
        EmailVerificationData: this.emailVerificationData
      };

      this.http.post('http://localhost:5018/api/register/pendingregistrations',requestBody).subscribe({
        next:(response:any)=>{
          this.router.navigate(['/login'],{
                  queryParams: {
                    response: "Success"
                  }
                });   
                this.allowToRegister=false;                   
        },
        error:(err:any)=>{
          let resp=err.error.message=="Duplicate Email!"?"Duplicate":"Failure"
          this.router.navigate(['/login'],{
                  queryParams: {
                    response: resp,
                  }
                }); 
        }
      }); 
    
    }


}

