import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { jsPDF } from 'jspdf';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent {
  IsloggedIn:boolean=false;
  UserRole:any;
  profilepicture:any;

  
    constructor(private loginstatuscheckservice:LoginStatusCheckServiceService,
                private router:Router,
                public authService:AuthService
    ){}


  ngOnInit(): void {    
    this.loginstatuscheckservice.isLoggedIn.subscribe(state => {
      this.IsloggedIn = state;
    });
    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    
    if(sessionStorage.getItem('id_token')){
      this.IsloggedIn=true;
      this.UserRole=this.authService.userRole;
    }
    else if(sessionStorage.getItem('Token')){
      this.IsloggedIn=true;
      this.UserRole=this.authService.getUserDetails().role;
    }    
  }

  Logout(){
    this.authService.profilepicture="";
    this.IsloggedIn=false;
    this.UserRole='';
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  defaultProfilePic = 'assets/NoProfileImage.png'; // Path to your fallback image

  setDefaultImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultProfilePic;
  }

  // jsonparse(){
  //   let data=[
  //     {
  //         "resumeDataId": 1,
  //         "user_id": "hitesh",
  //         "details": "{\"skills\": [{\"skills\": [\"JavaScript\", \"TypeScript\", \"Angular (2,7,8,10,11,14,15)\", \"Node JS\", \"HTML\", \"HTML-5\", \"CSS\", \"C\", \"Java\", \"Python\", \".NET Core\", \"ASP.NET Core\", \"C#\", \"Web API\", \"SQL Server\", \"MongoDB\", \"MaterialDesign\"], \"category\": \"Programming languages & concepts\"}, {\"skills\": [\"Visual Studio\", \"IntelliJ\", \"PyCharm\", \"Android Studio\", \"Oracle\", \"Snowflake\", \"MySQL\", \"Informatica\", \"Pandas\", \"Anaconda\", \"XCode\", \"Qlik Sense\", \"Qlik View Test Data Manager\", \"Splunk\", \"Eclipse\", \"JUNIT\", \"JaCoCo\", \"Valgrind\", \"Selenium\", \"AWS RDS\"], \"category\": \"Technical Tools\"}, {\"skills\": [\"Unix\", \"Linux\", \"Windows\", \"MacOS\"], \"category\": \"Operating Environments\"}], \"contact\": [{\"email\": \"ldhitesh.02@gmail.com\", \"phone\": \"469-836-9134\", \"fullname\": \"HITESH LAKSHMAIAH DINESH\", \"linkedin\": \"https://www.linkedin.com/in/hitesh2021/\", \"location\": \"Arlington, TX -76013\"}], \"education\": [{\"city\": \"Arlington\", \"date\": \"Dec 2020\", \"major\": \"Master of Science in Computer Science\", \"state\": \"Texas\", \"institution\": \"The University of Texas At Arlington\"}, {\"city\": \"\", \"date\": \"May 2017\", \"major\": \"Bachelor in Electronics and Communications Engineering\", \"state\": \"India\", \"institution\": \"Visvesvaraya Technological University\"}], \"certifications\": [\"CP-SAT (Certified Professional – Selenium Automation Testing)\", \"Angular with Node.js (Edureka)\", \"AWS Practitioner\"], \"work_experience\": [{\"role\": \"Software Engineer\", \"company\": \"Cedent Consulting Inc\", \"date_range\": \"Jan 2024 – Current\", \"responsibilities\": [\"Designed and developed REST APIs in ASP.NET 8.0 applications\", \"Implemented Angular CLI setup with components, directives, services, and pipes\", \"Managed authentication with JWT, ECS Fargate task definitions and CI/CD\"]}, {\"role\": \"Full Stack Developer\", \"company\": \"Graco\", \"date_range\": \"March 2023 – Jan 2024\", \"responsibilities\": [\"Used Angular 15 and NgRx for state management\", \"Built REST APIs in ASP.NET Core, integrated CRUD in Angular\", \"Tested APIs using xUnit, reduced load times using observables\"]}, {\"role\": \"Software Engineer\", \"company\": \"Abbvie\", \"date_range\": \"May 2021 – Aug 2022\", \"responsibilities\": [\"Built reusable Angular components, form validation\", \"Developed APIs using ASP.NET Core and SQL for data flow\"]}, {\"role\": \"Software Test Engineer in Development\", \"company\": \"Travelers\", \"date_range\": \"Aug 2017 – July 2018\", \"responsibilities\": [\"Created efficient stored procedures, indexes and optimized queries\", \"Trained in Core Java, Selenium, SQL, Unix, and HTML at LTI\"]}]}"
  //     }
  // ]
  // data.forEach(item => {

  //   item.details = JSON.parse(item.details);
  // });

  // console.log(data);
  

  // }
}
