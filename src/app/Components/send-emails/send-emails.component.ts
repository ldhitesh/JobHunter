import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
  selector: 'app-send-emails',
  templateUrl: './send-emails.component.html',
  styleUrls: ['./send-emails.component.css']
})
export class SendEmailsComponent {
  inputText: string = ''; 
  tags: string[] = []; 
  prevtags: string[] = []; 
  mailselection:string='';
  filteredSuggestions:any= []; 
  suggestions:any=[];
  selectedradio:string='';
  selectedIndex: number = 0;  // To track the currently selected suggestion index
  private apiUrl = 'http://localhost:80/api/email/sendgmailapi'; // API URL to send email
  public emailData = {
    "SenderName":"",
    "FromEmail":"",
    "ToEmail":"",
    "Subject":"",
    "Body":""
  };
  public UserRole:any;
  notificationMessage: string='';


  constructor(private http:HttpClient,private cdr: ChangeDetectorRef,
            private loginstatuscheckservice:LoginStatusCheckServiceService,
            private notificationService: NotificationServiceService,
            private authService:AuthService){}
 
  ngOnInit(): void {
    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(sessionStorage.getItem('id_token')){
      this.UserRole=this.authService.userRole;
    }
    else if(sessionStorage.getItem('Token')){
      this.UserRole=this.authService.getUserDetails().role;
    }    
    
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.http.get('http://localhost:80/api/companies/getcompanyreferences').subscribe({
      next: (data) => {
        this.suggestions=data;        
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  addReferrer(): void {
    if (this.inputText.trim()) {
      this.tags.push(this.inputText.trim());
      this.inputText = ''; 
      this.selectedIndex=0;
      this.filteredSuggestions = []; 
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  filterSuggestions() {    
    if (this.inputText.trim() == '' || this.inputText.length==0) {
      this.filteredSuggestions=[];
    } else {
      this.filteredSuggestions = this.suggestions.filter((item:any) =>
        item.organization.toLowerCase().includes(this.inputText.toLowerCase())
      );
    }
  }

  selectSuggestion(suggestion: any) {
    this.inputText = suggestion.email;
    this.addReferrer();
    this.filteredSuggestions = []; 
  }


  onKeyDown(event: KeyboardEvent) {
    
    switch (event.key) {
      case 'ArrowDown':
        if (this.selectedIndex < this.filteredSuggestions.length - 1) {
          this.selectedIndex++;
          this.scrollToSelected();
        }
        break;
      case 'ArrowUp':
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
          this.scrollToSelected();

        }
        break;
      case 'Enter':
        if (this.selectedIndex > -1 && this.filteredSuggestions[this.selectedIndex]) {
          this.selectSuggestion(this.filteredSuggestions[this.selectedIndex]);
        }
        break;
    }
  }

  scrollToSelected(): void {
    const suggestionList = document.querySelector('.suggestions');
    const selectedItem = suggestionList?.querySelector('.selected');
    if (selectedItem) {
      // Ensure the DOM is updated before scrolling
      this.cdr.detectChanges();  // Trigger Angular's change detection to update the view
      selectedItem.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'center'    // Scroll to bring the selected item into view
      });
    }
  }

  allRecruiterRadioClicked(){   
    if(this.mailselection.length==0 || this.mailselection=='Employees'){
      this.prevtags=this.prevtags.length==0?this.tags:this.prevtags;
      this.tags=[];
      this.mailselection="Recruiter"; 
    }
    else{
      this.mailselection=''; 
      this.tags=this.prevtags;      
    }
  }

  allEmployeeRadioClicked(){   
    if(this.mailselection.length==0 || this.mailselection=='Recruiter'){
      this.prevtags=this.prevtags.length==0?this.tags:this.prevtags;
      this.tags=[];
      this.mailselection="Employees"; 

    }
    else{
      this.mailselection=''; 
      this.tags=this.prevtags;        
    }
  }
  onEnterKey() {}

  sendEmail() {
    this.emailData.FromEmail=this.authService.email;
    this.emailData.SenderName=this.authService.username;
    if(this.mailselection.length!=0){
      this.emailData.ToEmail=this.mailselection;
      this.http.post(this.apiUrl,this.emailData).subscribe({
        next: (response) => {
          this.emailData.Body = '';
          this.emailData.Subject = '';
          this.notificationService.showNotification('Email sent successfully!');
        },
        error: (error) => {
          this.notificationService.showNotification('Email Failed!');
        }
      });
    }
    else{
      this.tags.forEach(To => {
        this.emailData.ToEmail=To;      
        this.http.post(this.apiUrl,this.emailData).subscribe({
          next: (response) => {
            this.emailData.Body = '';
            this.emailData.Subject = '';
            this.notificationService.showNotification('Email sent successfully!');
          },
          error: (error) => {
            this.notificationService.showNotification('Email Failed!');
          }
        });
      });
      this.tags=[];
    }
    this.mailselection='';
    this.prevtags=[];

  }

  Clear(){
    this.tags=[];
    this.prevtags=[];

  }
}