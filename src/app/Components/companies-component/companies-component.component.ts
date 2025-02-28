import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'companies-component',
  templateUrl: './companies-component.component.html',
  styleUrls: ['./companies-component.component.css']
})
export class CompaniesComponentComponent {

  public companies: any;
  public filtercompanies:any=[];
  public nomatchingdata:boolean=false;
  public pageSize = 8;
  public currentPage = 1;
  public totalPages:any;
  public UserRole:any;

  constructor(private http:HttpClient,private router:Router,
              private loginstatuscheckservice:LoginStatusCheckServiceService){}


 
  ngOnInit(): void {
    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(sessionStorage.getItem('Role')){
      this.UserRole=sessionStorage.getItem('Role');
    }
    this.fetchCompanies();
  }
  

  fetchCompanies(): void {
    this.http.get('http://api.jobhunter.life/api/companies').subscribe({
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
    this.currentPage=1;

    this.paginatedData(); 
  }

  paginatedData() {
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



}


