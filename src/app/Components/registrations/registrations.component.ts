import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
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
                      private activatedroute:ActivatedRoute
  ){}


  ngOnInit(): void {
    this.fetchPendingApprovals();
    this.UserName = this.activatedroute.snapshot.paramMap.get('UserName');
    this.UserRole=sessionStorage.getItem(this.UserName);  
  }

  fetchPendingApprovals(): void {
    this.http.get('http://api.jobhunter.life/api/register/getpendingregistrations').subscribe({
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
    
    this.http.post('http://api.jobhunter.life/api/register',user).subscribe({
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
    
    this.http.delete(`http://api.jobhunter.life/api/register/rejectregistration/${user.username}`).subscribe({
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
