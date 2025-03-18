import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { PaginationService } from 'src/app/Services/pagination-service.service';

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
  public isEditing:any=-1;
  constructor(private http:HttpClient,private router:Router,
              private loginstatuscheckservice:LoginStatusCheckServiceService,
              private paginationService: PaginationService,
              private authService:AuthService){}


 
  ngOnInit(): void {

    this.loginstatuscheckservice.Role.subscribe(role => {
      this.UserRole = role;
    });    
    if(sessionStorage.getItem('id_token')){
      this.UserRole=this.authService.userRole;
    }
    else if(sessionStorage.getItem('Role')){
      this.UserRole=sessionStorage.getItem('Role');
    }
    this.paginationService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
    this.fetchCompanies();

  }
  

  fetchCompanies(): void {
    this.http.get('http://localhost:80/api/companies').subscribe({
      next: (data) => {        
        this.companies=data;    
        this.filtercompanies=data;  
        this.totalPages=Math.ceil(this.filtercompanies.length/this.pageSize);  
          this.filtercompanies.forEach((data:any)=>{
            const lastAppliedDate = new Date(data.lastApplied);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - lastAppliedDate.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
  
            if (daysDiff > 15 && data.status=='Applied') {
              data.status = 'Re Apply';
            } else if(data.status=='Not Applied') {
              data.status = 'Not Applied';
            }
            else{
              data.status = 'Applied';
            }

          })          
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
      this.paginationService.changePage(this.currentPage-=1);
      this.paginatedData
    }
  }

  NextClicked(){
    if(this.currentPage<this.totalPages){
      this.paginationService.changePage(this.currentPage+=1);
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
        link:data.link,
        button:"update"
      }
    });
  }

  statuschanged(data:any){

    data.status=data.status=="Applied"?"Not Applied":"Applied";
    
    if(data.status=='Applied')
      data.lastApplied=new Date().toString().slice(4,15);
      
    this.http.patch(`http://localhost:80/api/companies/updatecompany/${data.organization.trim()}`,data).subscribe({
      next:(response:any) => {
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
  });
  }


  editlink(data:any) {
    this.isEditing =data.id; 
  }
  
  saveLink(data:any) {
    console.log(data);
    
    this.http.patch(`http://localhost:80/api/companies/updatecompany/${data.organization.trim()}`,data).subscribe({
      next:(response:any) => {
        this.isEditing = false; 
    },
    error:(err:any) => {      
      const errorMessage = err.error?.message || 'An unexpected error occurred.';
      alert(errorMessage);   
    }
  });

  }

  cancellink(){
    this.isEditing=-1;
  }
  

}


