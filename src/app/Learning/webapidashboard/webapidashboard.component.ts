import { Component } from '@angular/core';

@Component({
    selector: 'webapidashboard',
    templateUrl: './webapidashboard.component.html',
    styleUrls: ['./webapidashboard.component.css'],
    standalone: false
})
export class WebapidashboardComponent {
  
  // Interview Questions with Links
  interviewQuestions = [
    { question: "What is a Web API?", link: "https://example.com/web-api-definition" },
    { question: "What is the difference between REST and SOAP APIs?", link: "https://example.com/rest-vs-soap" },
    { question: "What are HTTP methods in REST APIs?", link: "https://example.com/http-methods-rest" },
    { question: "What is authentication in Web APIs?", link: "https://example.com/api-authentication" },
    { question: "Can you explain the concept of statelessness in RESTful services?", link: "https://example.com/rest-stateless" }
  ];

  videoLinks: { title: string, url: string }[] = [
    { title: "Introduction to Web APIs", url: "https://www.youtube.com/watch?v=someLink1" },
    { title: "Understanding REST APIs", url: "https://www.youtube.com/watch?v=someLink2" },
    { title: "Web API Authentication and Authorization", url: "https://www.youtube.com/watch?v=someLink3" }
  ];
}
