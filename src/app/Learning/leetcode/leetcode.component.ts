import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-leetcode',
    templateUrl: './leetcode.component.html',
    styleUrls: ['./leetcode.component.css'],
    standalone: false
})
export class LeetcodeComponent {
  newProblemLink: string = '';
  newProblemNotes: string = '';
  leetcodeform=false;
  showNotes=false;
  showNoteIndex:any=-1;
  showtextnote:any="Show Note"
  solvedProblems:any;
  isAddNoteEditable:any=false;
  chartData:any;
  chartData1:any;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  totalSolvedProblems:any;  // This could be dynamic from your data

  constructor(private http:HttpClient, private authService:AuthService) {}

  ngOnInit(): void {
    this.fetchproblems(); 
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
  generateBarChart(){
    const weekDates: { [key: string]: number } = {};
    const today = new Date();
    const weekStart = this.getMonday(today);
    weekDates['total']=0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const key = this.formatDate(date);
      weekDates[key] = 0;
    }
    // Count solved problems for each day
    this.solvedProblems.forEach((p:any) => {
      const key = this.formatDate(new Date(p.solved_date));
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
          label: 'Problems Solved This Week',
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.1
        }
      ]
    };
    this.chartData1 = {
      labels: ['Total Problems Solved'],  // Label for the bar
      datasets: [
        {
          label: 'Count',
          data: [this.totalSolvedProblems],  // Total value
          backgroundColor: '#0b314d', // Bar color
          borderColor: '#1E88E5',
          borderWidth: 0.2,
        }
      ]
    };
  }
  


  fetchproblems(){
    this.http.get('http://localhost:80/api/discussion/getleetcodeproblemslist').subscribe({
      next:(response:any)=>{
        this.solvedProblems=response
        this.totalSolvedProblems=this.solvedProblems.length;
        this.generateBarChart();
      },
      error:(err:any)=>{     
        console.log(err);  
      }
    })
  }
  
  addNoteToProblem(id: number, note: string): void {
    const problem = this.solvedProblems.find((p:any) => p.problem_id == id);
    problem.problem_notes = note;
    this.http.patch('http://localhost:80/api/discussion/updateleetcodeproblemslist',problem).subscribe({
      next:(response:any)=>{        
      },
      error:(err:any)=>{     
        console.log(err);
          
      }
    })
    this.isAddNoteEditable=false;
  }

  addProblem(): void {
    const now=new Date();
    this.authService.setUserDetails();
    let formatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ` 
      const newProblem = {
      problem_link: this.newProblemLink,
      problem_notes: this.newProblemNotes,
      user_id:this.authService.email,
      solved_date:formatted
    };
    
    this.http.post('http://localhost:80/api/discussion/postleetcodeproblemslist',newProblem).subscribe({
      next:(response:any)=>{        
        this.solvedProblems.push(response.data);
        this.newProblemLink = '';
        this.newProblemNotes = '';
    
        this.closeModal();
      },
      error:(err:any)=>{     
        console.log(err);
          
      }
    })
  
  }

  openModal(): void {
    this.leetcodeform = true;
  }

  closeModal(): void {
    this.leetcodeform = false;
  }

  extractProblemName(url: string): string {
    const regex = /\/problems\/([^/]+)\//;
    const match = url.match(regex);
    
    if (match && match[1]) {
      return match[1]; // Extracted problem name
    }
    return 'Problem'; // Return empty string if no match is found
  }

  setShowNotesIndex(index:any){
    this.isAddNoteEditable=false;

    if(this.showNoteIndex==index){
      this.showNoteIndex=-1;
    }
    else{
      this.showNoteIndex=index
    }
    
  }



  setAddNoteEditable(){
    this.isAddNoteEditable=true;
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



 
  
}
