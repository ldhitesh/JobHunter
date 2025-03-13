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
  public registeredEmails:any=[];
  public duplicateemailexists:boolean=false;
  registerform!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,
              private activatedroute:ActivatedRoute,private toastr: ToastrService,
              )
  {
    this.registerform=this.fb.group({
      username: [ '', Validators.required],
      email:['',Validators.required ],
      password: ['', Validators.required ],
      confirmpassword: [''],
      paymentstatus:[''],
      verificationtoken:[''],
      accountverificationstatus:[''],
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

    this.getRegisteredEmails();

  }

  showNotification(registerDetails:any,status:any) {
    this.registerResponse=status;

    if(status=='Success'){
      this.allowToRegister=true;    
      this.registerform.patchValue({
        username: registerDetails.Username,
        email: registerDetails.Email,
        password: registerDetails.Password,
        confirmpassword: registerDetails.ConfirmPassword,
        paymentstatus: "Completed(Verify-Transaction)"
      }); 
    }   
  }

  getRegisteredEmails(){  
      this.http.get('http://localhost:80/api/register/getregisteredemails').subscribe({

      next:(emails:any)=>{        
        this.registeredEmails=emails;                  
      },
      error:(err:any)=>{
        console.log(err.error.message);

      }
    }); 
  }


  IsPasswordMatched(){
    return this.registerform.get('password')?.value==this.registerform.get('confirmpassword')?.value
          ? true :false;
  }


  hasemailalreadyregistered(){
    if (this.registeredEmails.includes(this.registerform.get('email')?.value)) {
      this.duplicateemailexists=true;
    }
    else{
      this.duplicateemailexists= false;
    }
  }

  OnRegister(){    
      this.emailVerificationData.to=this.registerform.value.email;
      this.emailVerificationData.subject="Please Verify Your Email Address to Complete Registration"
      this.emailVerificationData.body=this.registerform.value.username;
      const requestBody = {
        RegisterData: this.registerform.value,
        EmailVerificationData: this.emailVerificationData,
        verificationUrl:"http://localhost:80/api/email/verify-email?redirectto=http://localhost:5000/email-verification-complete"
      };

      this.http.post('http://localhost:80/api/register/pendingregistrations',requestBody).subscribe({
        next:(response:any)=>{
          sessionStorage.clear();
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

    hasUsernameUpperCase(): boolean {
      return  /[A-Z]/.test(this.registerform.get('username')?.value);
    }
  
    hasUsernameLowerCase(): boolean {
      return /[a-z]/.test(this.registerform.get('username')?.value);
    }
  
    hasUsernameMinLength(): boolean {
      return this.registerform.get('username')?.value?.length >= 8;
    }

    hasPasswordUpperCase(): boolean {
      return  /[A-Z]/.test(this.registerform.get('password')?.value);
    }
  
    hasPasswordLowerCase(): boolean {
      return  /[a-z]/.test(this.registerform.get('password')?.value);
    }
  
    hasPasswordSpecialChar(): boolean {
      return /\W/.test(this.registerform.get('password')?.value);
    }
  
    hasPasswordMinLength(): boolean {
      return  this.registerform.get('password')?.value?.length >= 8;
    }

    hasEmailvalidated():boolean{
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(this.registerform.get('email')?.value);
    }

    checkvalidations():boolean{
    return  this.hasPasswordUpperCase() && 
            this.hasPasswordLowerCase() && 
            this.hasPasswordSpecialChar() && 
            this.hasPasswordMinLength() &&
            this.hasUsernameUpperCase() &&
            this.hasUsernameLowerCase() &&
            this.hasUsernameMinLength() &&
            this.hasEmailvalidated() &&
            !this.duplicateemailexists &&
            this.IsPasswordMatched()
            
    }
}

