import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginStatusCheckServiceService } from 'src/app/Services/login-status-check-service.service';
import { PaginationService } from 'src/app/Services/pagination-service.service';

@Component({
    selector: 'companies-component',
    templateUrl: './companies-component.component.html',
    styleUrls: ['./companies-component.component.css'],
    standalone: false
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
  chartData:any;
  chartData1:any;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  totalCompaniesApplied:any=0;  // This could be dynamic from your data
  linkdintotalcount:any=0;
  linkdinData:any;

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
    else if(sessionStorage.getItem('Token')){
      this.UserRole=this.authService.getUserDetails().role;
    }
    this.paginationService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
    this.fetchCompanies();
  
  }  


dropdownOpen = false;
linkdinkeysearchvalue = '';
dropdownPosition: { top: string, left: string } = { top: '0px', left: '0px' }; // Position of dropdown

toggleDropDown() {
  this.dropdownOpen = !this.dropdownOpen;
}

openLinkdIn(option: any) {

    const links:any = {
      dotnet: 'https://www.linkedin.com/jobs/search/?currentJobId=4207476632&f_E=2%2C3%2C4&f_TPR=r86400&keywords=dotnet%20.Net&origin=JOB_SEARCH_PAGE_JOB_FILTER&sortBy=DD',
      angular: 'https://www.linkedin.com/jobs/search/?currentJobId=4209000898&f_E=2%2C3%2C4&f_JT=F&f_TPR=r86400&keywords=angular&origin=JOB_SEARCH_PAGE_JOB_FILTER&sortBy=DD',
      fullstack: 'https://www.linkedin.com/jobs/search/?currentJobId=4209000898&f_E=2%2C3%2C4&keywords=fullstack&origin=JOB_SEARCH_PAGE_JOB_FILTER&sortBy=DD',
      frontend: 'https://www.linkedin.com/jobs/search/?currentJobId=4209000898&f_E=2%2C3%2C4&f_TPR=r86400&keywords=frontend&origin=JOB_SEARCH_PAGE_JOB_FILTER&sortBy=DD'
    };

    if (option && links[option]) {
      this.linkdinkeysearchvalue = links[option];
      window.open(this.linkdinkeysearchvalue);
    }

    this.dropdownOpen = false; // Close the dropdown
  }

  fetchCompanies(): void {
    this.http.get('http://localhost:80/api/companies').subscribe({
      next: (data) => {        
        this.companies=data;  
        this.generateBarChart();  
        this.filtercompanies=data;  
        this.totalPages=Math.ceil(this.filtercompanies.length/this.pageSize);  
          this.filtercompanies.forEach((data:any)=>{
            const lastAppliedDate = new Date(data.lastApplied);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - lastAppliedDate.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
  
            if (daysDiff > 215 && data.status=='Applied') {
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
  


  getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
    const diff = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + diff);
    return date;
  }
  formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`; // Returns 'YYYY-MM-DD'
  }

  convertDate(inputDate: string): string {
    const date = new Date(inputDate);
    
    date.setDate(date.getDate());
    
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  generateBarChart(){
    const weekDates: { [key: string]: number } = {};
    const today = new Date();
    const weekStart = this.getMonday(today);
    weekDates['total']=0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      let key = this.formatDate(date);
      weekDates[key] = 0;
    }
    // Count solved problems for each day
    this.companies.forEach((p:any) => {
      // const key = this.formatDate(new Date(p.lastApplied));
      const key = this.convertDate(p.lastApplied);

      if (weekDates.hasOwnProperty(key)) {
        weekDates[key]++;
      }
    });

    Object.values(weekDates).forEach((val:any)=>{
      weekDates['total']+=val;
    })


    this.chartData= {
      labels: ['Total','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          data: Object.values(weekDates),
          label: 'Companies Applied This Week',
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.1
        }
      ]
    };

    this.companies.forEach((data:any) =>{
      if(data.lastApplied!="Yet to Apply"){
        this.totalCompaniesApplied++;
        if(data.source=="LinkdIn"){
          this.linkdintotalcount++;
        }
      }
    });

    
    this.linkdinData = {
      labels: ['LinkedIn'],  // Label for the bar
      datasets: [
        {
          label: 'Count',
          data: [this.linkdintotalcount],  // Total value
          backgroundColor: '#0b314d', // Bar color
          borderColor: '#1E88E5',
          borderWidth: 0.2,
        }
      ]
    };    
    
    this.chartData1 = {
      labels: ['Total Companies Applied'],  // Label for the bar
      datasets: [
        {
          label: 'Count',
          data: [this.totalCompaniesApplied],  // Total value
          backgroundColor: '#0b314d', // Bar color
          borderColor: '#1E88E5',
          borderWidth: 0.2,
        }
      ]
    };
  }
  
  chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,  // Disable aspect ratio to respect set height/width
    indexAxis: 'y',  // This makes it a horizontal bar chart
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        barPercentage: 0.2, // Adjust the bar width (between 0 and 1, where 1 is full width)
        ticks: {
          color: '#0b314d',  // X-axis color
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        barPercentage: 0, // Adjust the bar width (between 0 and 1, where 1 is full width)
        ticks: {
          color: '#0b314d',  // Y-axis color
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  @ViewChild('dropdown-wrapper') dropdownWrapper!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!this.dropdownOpen &&  target.id=="applywithlinkdin-btn") {
      this.dropdownOpen = true;
    }
    else if(this.dropdownOpen &&  target.id!="applywithlinkdin-btn"){ 
      this.dropdownOpen = false;

    }
  }
}


