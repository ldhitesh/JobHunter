import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/Services/auth.service';
import { GetDataService } from 'src/app/Services/get-data.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';
import { ResumebuilderService } from 'src/app/Services/resumebuilder.service';

@Component({
    selector: 'app-resume-builder',
    templateUrl: './resume-builder.component.html',
    styleUrls: ['./resume-builder.component.css'],
    standalone: false
})
export class ResumeBuilderComponent {
  public doc:any=new jsPDF();
  public resumeType:any;
  public resumedata:any;
  public profilecreation:any;

  constructor(private _resumebuilder:ResumebuilderService,
              private activatedRoute: ActivatedRoute,
              private authService:AuthService,
              private http:HttpClient,
              private router:Router,
              private  notificationService: NotificationServiceService

  ){
  }
  ngOnInit(): void {
    if(this.authService.email==undefined){
      this.authService.setUserDetails();
    }

    this.activatedRoute.queryParams.subscribe((params:any) => {
      this.resumeType = params['resumeType']; 
      if(params['profilecreation']){
        this.profilecreation=params['profilecreation']
      }
      if(params['resumedata']){
        this.generatePDF(JSON.parse(params['resumedata']));                  
      }
    });    

    if(this.resumeType=="previousResume"){
      this.getLatestResumeData();
    }
  }

  getLatestResumeData(){
        
        const headers = new HttpHeaders({
          'Content-Type': 'application/json', // Set content type to application/json
        });
    
        // Make the GET request with the user_id as a query parameter
        this.http.get<any>(`http://localhost:80/api/resume/getresumedata?user_id=${this.authService.email}`, { headers }).subscribe({
              next:(response:any) => {    
                if (response[0] && response[0].details) {
                  response[0].details = JSON.parse(response[0].details);
                  if(response[0].resumecreated=="YES"){
                    this.generatePDF(response[0].details);                  
                  }
                  else{
                    this.notificationService.showNotification('No Resume Created!');
                  }
                }     
                else{
                  this.notificationService.showNotification('No Resume Data!');
                }
              },
          error:(err:any) => {    
            if(err.error="No Resume Data"){
              this.notificationService.showNotification('No Resume Data!');
            }
            this.router.navigate(['resumegenerator'])
          }
        })
        
      
  }

  generatePDF(event:any){

    this._resumebuilder.setdoc(this.doc)
    this.resumedata=event;
    let currLine = 20;
    
    //adding header
    if(this.resumedata['contact']){
      let contactdata=this.resumedata.contact[0];

      let linkdin=contactdata["linkedin"]?contactdata["linkedin"]+ " | ":""
      currLine=this._resumebuilder.addHeader(
        currLine,
        contactdata["fullname"],
        contactdata["location"]+ " | " +        
        contactdata["phone"]+ " | " + 
        linkdin +
        contactdata["email"]
      )  
      currLine+=this._resumebuilder.lineHeight
  
    }
    

    //adding education
    
    if(this.resumedata['education'].length>0){
      
      currLine==this._resumebuilder.addUnderlineTitle("EDUCATION",currLine);
      currLine+=this._resumebuilder.lineHeight
  
      for (const data of this.resumedata['education']) {
        let location=data["city"].length>0?data["city"]+", ":""
        let date=data['currdate']?"Current": data["date"]
        currLine=this._resumebuilder.addBulletWithRightDate(
          data["major"]+", " +
          data["institution"]+" - " +
          location+data["state"], 
          date,
          currLine
        );
      }
      currLine+=this._resumebuilder.lineHeight
  
    }
   

    //adding skills
    if(this.resumedata['skills'].length>0){
      currLine==this._resumebuilder.addUnderlineTitle("SKILLS",currLine);
      currLine+=this._resumebuilder.lineHeight
      for (const data of this.resumedata['skills']) {
        currLine=this._resumebuilder.addBulletWithLabel(
          data["category"],
          data["skills"].join(", "),
          currLine
        );
      }
      currLine+=this._resumebuilder.lineHeight
    }

    

    //adding experience
    if(this.resumedata['work_experience'].length>0){
      currLine==this._resumebuilder.addUnderlineTitle("WORK EXPERIENCE",currLine);
      currLine+=this._resumebuilder.lineHeight
      for (const data of this.resumedata['work_experience']) {
        currLine=this._resumebuilder. addLeftRight(
          data["company"] + " | " +
          data["role"],
          data["date_range"],
          currLine);
        currLine+=3
        
        for(let points of data["responsibilities"]){
          currLine=this._resumebuilder.addBullet(
            points,
            currLine
          );
        }
        currLine+=3

      }
      currLine+=this._resumebuilder.lineHeight

    }
    

    //adding certifications
    if(this.resumedata["certifications"].length>0){
      currLine==this._resumebuilder.addUnderlineTitle("CERTIFICATIONS",currLine);
      currLine+=this._resumebuilder.lineHeight
      for(let data of this.resumedata["certifications"]){
        currLine=this._resumebuilder.addBullet(
          data.toString(),
          currLine
        );
      }
    }
    if(this.resumeType=='newResume'){
      let data={
        "user_id":this.authService.email,
        "details":JSON.stringify(this.resumedata, null, 2),
        "resumecreated":"YES"
      }
      
      this.http.post('http://localhost:80/api/resume',data).subscribe({
        next:(response:any)=>{
        },
        error:(err:any)=>{       
          const errorMessage = err.error?.message || 'An unexpected error occurred.';
        }
      })
    }
   
    this.doc.save(this.authService.username+".pdf");
    this.notificationService.showNotification('Downloaded successfully!');
    this.doc=new jsPDF();
    this.router.navigate(['resumegenerator']);

  }


  
}
