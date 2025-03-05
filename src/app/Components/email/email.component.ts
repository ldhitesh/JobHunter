import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  private apiUrl = 'http://localhost:80/api/email/send'; // API URL to send email
  public emailData = { to: '', subject: '', body: '' };
  public userRole:any='';

  constructor(private http: HttpClient, 
              private router:Router,
              private activatedroute: ActivatedRoute,
              private loginstatuscheckservice:LoginStatusCheckServiceService,
              private notificationService: NotificationServiceService){}


  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.emailData.to = params['To'];
    });
    this.loginstatuscheckservice.Role.subscribe(role => {
      this.userRole = role;
    });    
    if(sessionStorage.getItem('Role')){
      this.userRole=sessionStorage.getItem('Role');
    }
  }

  // Send email method
  sendEmail() {
    let formattedEmail = {...this.emailData};
    this.emailData.body = '';
    this.emailData.subject = '';
    this.router.navigate(['/references'])

    this.http.post(this.apiUrl, this.formatEmailBody(formattedEmail)).subscribe({
      next: (response) => {
          this.notificationService.showNotification('Email sent successfully!');
      },
      error: (error) => {
          this.notificationService.showNotification('Email Failed!');
      }
    });
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

  onEnterKey() {}
}
