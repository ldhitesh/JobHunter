import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  private apiUrl = 'http://localhost:5018/api/email/send';
  public emailData = { to:'', subject:'', body:'' };

  constructor(private http: HttpClient, private activatedroute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.emailData.to= params['To'];
      });
  }

  sendEmail() {
    console.log(this.emailData.body)
    this.http.post(this.apiUrl, this.emailData).subscribe({
      next: (response) => alert('Email sent successfully!'),
      error: (error) => alert('Error sending email: ' + error.message),
    });
  }

  onEnterKey(){
    this.emailData.body+='\n';
  }
}
