import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { GetDataService } from 'src/app/Services/get-data.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
    selector: 'app-resume-generator',
    templateUrl: './resume-generator.component.html',
    styleUrls: ['./resume-generator.component.css'],
    standalone: false
})
export class ResumeGeneratorComponent {

options: string[] = [   'Angular', '.NET', 'React', 'DevOps','Java','Cloud','DataScience',
                        'React-Java','React.Net','Angular-Java','Angular.Net',
];
selectedOption: string = '';
allPoints:any;
allPointsCopy:any;
resumeData:any;
displayedPoints: string[] = [];
showmodal:any;
userprofilecreated:any;
create_edit_profile_tag:string='Create Profile';
selectedPoints: number = 4;
pointOptions: number[] = [4, 5, 6, 7, 8];
  
  constructor(    private getDataService:GetDataService,
                private http:HttpClient,
                private authservice:AuthService,
                private router:Router,
                private notificationService:NotificationServiceService) {
                }

               
ngOnInit(): void {
if(this.authservice.email==undefined)
    this.authservice.setUserDetails();
this.getRessumeData();
}

getResponsibilityPoints(){
    this.getDataService.getDataFromAsset("/assets/data/responsibilities.json").subscribe({
      next:(response:any) => {
        this.allPoints=response[this.selectedOption]
        this.allPointsCopy = [...this.allPoints];
        this.loadRandomPoints();
      },
      error:(err:any) => {      
        console.log(err)
      }
    })
  }
            
loadRandomPoints(): void {
    if(this.allPoints.length<this.resumeData['work_experience'].length*this.selectedPoints){
        this.allPoints=[...this.allPointsCopy];
    }
    this.resumeData['work_experience'].forEach((work:any) => {
        work['responsibilities'] = this.allPoints.splice(0, this.selectedPoints);
    });

}

loadIndividualRandomPoints(work:any): void {
if(this.allPoints.length<5){
    this.allPoints=[...this.allPointsCopy];
}
work['responsibilities'] = this.allPoints.splice(0, this.selectedPoints);
}

toggleshowmodal(){
this.prepareCustomResume();
}

closemodal(){
    this.showmodal=!this.showmodal;
    this.selectedindex=-1;
}

closepreviewmodal(){
this.previewmodalwindow=!this.previewmodalwindow;
}

Download(){    
    this.router.navigate(['/resumebuilder'], {
        queryParams: { resumedata:JSON.stringify(this.resumeData) ,resumeType:"specific-resume"}
      });
}



prepareCustomResume(){
    if (this.resumeData){
        this.totalWorkedCompanies=this.resumeData['work_experience'].length;
        this.getResponsibilityPoints();
        this.showmodal=!this.showmodal;
    }     
    else{
        this.notificationService.showNotification('No Resume Data!');
    }   
}
        
        totalWorkedCompanies:any;
        previewmodalwindow:any;

togglepreviewmodal(){
    this.prepareCustomResume();
    this.previewmodalwindow=!this.previewmodalwindow;
}

getRessumeData(){
    const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Set content type to application/json
    });
    
    // Make the GET request with the user_id as a query parameter
    this.http.get<any>(`http://localhost:80/api/resume/getresumedata?user_id=${this.authservice.email}`, { headers }).subscribe({
        next:(response:any) => {    
            if (response[0] && response[0].details) {
                response[0].details = JSON.parse(response[0].details);
                this.resumeData=response[0].details;
                response[0].resumecreated== "YES"   
                                            ? this.create_edit_profile_tag='Edit Profile'
                                            : this.create_edit_profile_tag='Create Profile'

            }     
            },
        error:(err:any) => {      
            console.log(err)
            if(err.error="No Resume Data"){
                //this.notificationService.showNotification('No Resume Data!');
            }
        }
    })   
}

downloadPreviousResume(){
    if(this.resumeData){
        this.router.navigate(['resumebuilder'],{
            queryParams: {  resumeType: 'previousResume' }
          });
    }
    else{
        this.notificationService.showNotification('No Resume Data!');
    }
  
}

isEditing: boolean = false;
responsibilitiesText: string = '';
selectedindex:any=-1;
toggleEdit(index:any) {

    if( this.selectedindex!=index){
        this.responsibilitiesText = this.resumeData['work_experience'][index].responsibilities.join('\n');
        this.selectedindex=index;
    }
    else{
        this.resumeData['work_experience'][index].responsibilities= this.responsibilitiesText
                                                                    .split('\n')
                                                                    .map(line => line.trim())
                                                                    .filter(line => line); 
        this.selectedindex=-1;
        this.isEditing=false;
    }
  }
   
}
