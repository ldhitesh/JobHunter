import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
    selector: 'app-registrations',
    templateUrl: './registrations.component.html',
    styleUrls: ['./registrations.component.css'],
    standalone: false
})
export class RegistrationsComponent {

  pendingapprovals: any=[];
  public pageSize = 8;
  public currentPage = 1;
  public totalPages:any;
  public nomatchingdata:boolean=false;
  public UserName:any;
  public UserRole:any
  public notificationMessage:any;

  constructor(private http:HttpClient,private router:Router,
                      private activatedroute:ActivatedRoute,
                      private authService:AuthService
  ){}


  ngOnInit(): void {
    this.fetchPendingApprovals();
    this.UserName = this.activatedroute.snapshot.paramMap.get('UserName');
    this.UserRole=this.authService.userRole;

  }

  fetchPendingApprovals(): void {
    this.http.get('http://localhost:80/api/register/getpendingregistrations').subscribe({
      next: (data) => {
        this.pendingapprovals=data;    
        this.totalPages=Math.ceil(this.pendingapprovals.length/this.pageSize);  
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }
  get paginatedData() {
    const startIndex = (this.currentPage-1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.pendingapprovals.slice(startIndex, endIndex);
  }

  approveUser(user: any): void {   
    
    this.http.post('http://localhost:80/api/register',user).subscribe({
      next:(response:any)=>{
          this.fetchPendingApprovals();
      },
      error:(err:any)=>{       
        const errorMessage = err.error?.message || 'An unexpected error occurred.';
        this.notificationMessage=errorMessage;
      }
    })
  }

  rejectUser(user: any): void {
    
    this.http.delete(`http://localhost:80/api/register/rejectregistration/${user.username}`).subscribe({
      next:(response:any)=>{
        this.fetchPendingApprovals();
      },
      error:(err:any)=>{       
        const errorMessage = err.error?.message || 'An unexpected error occurred.';
        alert(errorMessage);   
      }
    })
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

  closeModal(){
    this.notificationMessage='';
  }
}
