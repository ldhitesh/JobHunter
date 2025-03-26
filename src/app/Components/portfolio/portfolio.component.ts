import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Reply {
  content: string;
  author: string;
  date: Date;
}

export interface Post {
  id: number;
  title: string;
  author: string;
  summary: string;
  date: Date;
  replies: Reply[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  
constructor() {}

}


