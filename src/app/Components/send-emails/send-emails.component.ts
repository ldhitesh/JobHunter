import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-send-emails',
  templateUrl: './send-emails.component.html',
  styleUrls: ['./send-emails.component.css']
})
export class SendEmailsComponent {
  inputText: string = ''; 
  tags: string[] = []; 
  mailselection:string='';
  filteredSuggestions:any= []; 
  suggestions:any=[];
  selectedradio:string='';
  selectedIndex: number = 0;  // To track the currently selected suggestion index
  private apiUrl = 'http://localhost:5018/api/email/send'; // API URL to send email
  public emailData = { to: '', subject: '', body: '' };

  constructor(private http:HttpClient,private cdr: ChangeDetectorRef){}

  
  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.http.get('http://localhost:5018/api/companies/getcompanyreferences').subscribe({
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
    if(this.mailselection.length==0 || this.mailselection=='Employees')
      this.mailselection="Recruiter"; 
    else{
      this.mailselection=''; 
    }
  }

  allEmployeeRadioClicked(){   
    if(this.mailselection.length==0 || this.mailselection=='Recruiter') 
      this.mailselection="Employees"; 
    else{
      this.mailselection=''; 
    }
  }
  onEnterKey() {}


  // Send email method
  sendEmail() {
    let formattedEmail = {...this.emailData};
    this.emailData.body = '';
    this.emailData.subject = '';
    var email={...this.formatEmailBody(formattedEmail)};
    if(this.mailselection.length!=0){
      email.to=this.mailselection;
      this.http.post(this.apiUrl,email).subscribe({
        next: (response) => {
          alert("Email Was sent successfully!")
        },
        error: (error) => {
          alert('Error sending email: ' + error.message)
        }
      });
    }
    else{
      this.tags.forEach(To => {
        email.to=To;      
        this.http.post(this.apiUrl,email).subscribe({
          next: (response) => {
            alert("Email Was sent successfully!")
          },
          error: (error) => {
            alert('Error sending email: ' + error.message)
          }
        });
      });
      this.tags=[];
    }
    this.mailselection='';

  }

  // This method formats the email body with custom HTML and CSS (Roboto font)
  formatEmailBody(email:any) {  
    email.body = `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
            body {
              font-family: 'Roboto', Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              padding: 20px;
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
            /* Use div instead of <pre> and apply pre-wrap style to preserve formatting */
            .formatted-body {
              font-family: 'Roboto', Arial, sans-serif; /* Ensure the font is applied */
              white-space: pre-wrap;  /* Preserve line breaks and spaces */
              word-wrap: break-word;  /* Allow long words to break and prevent overflow */
            }
          </style>
        </head>
        <body>
          <div class="formatted-body">${email.body}</div>  <!-- Use div with pre-wrap styling -->
        </body>
      </html>
    `;

    return email;
  }

}
