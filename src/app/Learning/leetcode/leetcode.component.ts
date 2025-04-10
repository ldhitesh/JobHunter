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
  constructor(private http:HttpClient, private authService:AuthService) {}

  ngOnInit(): void {
    this.fetchproblems(); 
  }

  
  fetchproblems(){
    this.http.get('http://localhost:80/api/discussion/getleetcodeproblemslist').subscribe({
      next:(response:any)=>{
        this.solvedProblems=response
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
    let formatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ` +
                `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
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

  isAddNoteEditable:any=false;
  setAddNoteEditable(){
    this.isAddNoteEditable=true;
  }
  
  
}
