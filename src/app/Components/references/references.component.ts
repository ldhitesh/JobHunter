import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent {
  public references: any;
  public nomatchingdata:boolean=false;
  public pageSize = 10;
  public currentPage = 1;
  public totalPages:any;
  constructor(private http:HttpClient,private router:Router){}

  
  ngOnInit(): void {
    this.fetchReferences();
  }

  fetchReferences(): void {
    this.http.get('http://localhost:5018/api/references').subscribe({
      next: (data) => {
        
        this.references=data;    
        this.totalPages=Math.ceil(this.references.length/this.pageSize);  
        console.log(this.references);

      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }


  get paginatedData() {
      const startIndex = (this.currentPage-1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.references.slice(startIndex, endIndex);
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

}
