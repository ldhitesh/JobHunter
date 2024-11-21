import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'companies-component',
  templateUrl: './companies-component.component.html',
  styleUrls: ['./companies-component.component.css']
})
export class CompaniesComponentComponent {

  public companies: any;
  public filtercompanies:any;
  public nomatchingdata:boolean=false;
  public pageSize = 10;
  public currentPage = 1;
  public totalPages:any;
  constructor(private http:HttpClient,private router:Router){}

  
  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.http.get('http://localhost:5018/api/companies').subscribe({
      next: (data) => {
        this.companies=data;    
        this.filtercompanies=data;  
        this.totalPages=Math.ceil(this.filtercompanies.length/this.pageSize);  
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }



  onSearch(searchstring: string): void {    
    this.filtercompanies = this.companies.filter((item:any) =>
      item.organization.toLowerCase().includes(searchstring.toLowerCase())
    );
  
    this.nomatchingdata=this.filtercompanies.length==0?true:false;
    this.totalPages=Math.ceil(this.filtercompanies.length/this.pageSize);  
  }

  get paginatedData() {
      
      const startIndex = (this.currentPage-1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filtercompanies.slice(startIndex, endIndex);
  }

  PrevClicked(){
    if(this.currentPage>1 ){
      this.currentPage-=1;
      this.paginatedData
    }
  }

  NextClicked(){
    if(this.currentPage<this.totalPages){
      this.currentPage+=1;
      this.paginatedData
    }
  }


  editcompanyform(data:any){
    this.router.navigate(['/addcompanyform'],{
      queryParams: {
        organization: data.organization,
        description: data.description,
        lastapplied: data.lastApplied,
        status: data.status,
        button:"update"
      }
    });
  }

  getapple(){

    
    this.http.get('https://jobs.apple.com/en-us/search?location=united-states-USA').subscribe({
      next: (data) => {
        console.log(data);
         
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

}


