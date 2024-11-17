import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'companies-component',
  templateUrl: './companies-component.component.html',
  styleUrls: ['./companies-component.component.css']
})
export class CompaniesComponentComponent {

  public companies: any;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.http.get('http://localhost:5018/api/companies').subscribe({
      next: (data) => {
        this.companies=data;        
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }




}
