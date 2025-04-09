import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/Services/auth.service';
import { GetDataService } from 'src/app/Services/get-data.service';
import { ResumebuilderService } from 'src/app/Services/resumebuilder.service';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent {
  public doc:any=new jsPDF();
  public resumeType:any;
  public resumedata:any;
  constructor(private _resumebuilder:ResumebuilderService,
              private activatedRoute: ActivatedRoute,
              private authService:AuthService,
              private http:HttpClient
  ){
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      this.resumeType = params['resumeType']; // Access the query parameter
    });    

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
        currLine+=1
        
        for(let points of data["responsibilities"]){
          currLine=this._resumebuilder.addBullet(
            points,
            currLine
          );
        }
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
        "details":JSON.stringify(this.resumedata, null, 2)
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
    this.doc=new jsPDF();

  }


  
}
