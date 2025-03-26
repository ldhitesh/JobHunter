import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent {
  public references: any;
  public filteredreferences:any=[];
  public nomatchingdata:boolean=false;
  public pageSize = 8;
  public currentPage = 1;
  public totalPages:any;
  public UserRole:any;

  constructor(private http:HttpClient,private router:Router,
              private loginstatuscheckservice:LoginStatusCheckServiceService,
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
    this.fetchReferences();
  }

  fetchReferences(): void {
    this.http.get('http://localhost:80/api/references').subscribe({
      next: (data) => {
        
        this.references=data;    
        this.filteredreferences=data;
        this.totalPages=Math.ceil(this.references.length/this.pageSize);  
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  onSearch(searchstring: string): void {    
    
    this.filteredreferences = this.references.filter((item:any) =>
      item.organization.toLowerCase().includes(searchstring.toLowerCase())
    );
  
    this.nomatchingdata=this.filteredreferences.length==0?true:false;
    this.totalPages=Math.ceil(this.filteredreferences.length/this.pageSize);  
  }

  get paginatedData() {
      const startIndex = (this.currentPage-1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredreferences.slice(startIndex, endIndex);
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

  SendMail(emailid:any){
    this.router.navigate(['/sendemail'],{
      queryParams: {
        To: emailid
      }
    });
  }


  editrefernceform(data:any){
    this.router.navigate(['/addreferenceform'],{
      queryParams: {
        organization: data.organization,
        name: data.name,
        position: data.position,
        email: data.email,
        link:data.link,
        button:"update"
      }
    });
  }

}
