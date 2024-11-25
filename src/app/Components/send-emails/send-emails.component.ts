import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-send-emails',
  templateUrl: './send-emails.component.html',
  styleUrls: ['./send-emails.component.css']
})
export class SendEmailsComponent {
  inputText: string = ''; 
  tags: string[] = []; 
  mailselection:boolean=false;
  filteredSuggestions:any= []; 
  suggestions:any=[];
  selectedIndex: number = 0;  // To track the currently selected suggestion index

  constructor(private http:HttpClient,private cdr: ChangeDetectorRef){}

  
  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.http.get('http://localhost:5018/api/companies/getcompanyreferences').subscribe({
      next: (data) => {
        this.suggestions=data;        
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  addReferrer(): void {
    if (this.inputText.trim()) {
      this.tags.push(this.inputText.trim());
      this.inputText = ''; 
      this.selectedIndex=0;
      this.filteredSuggestions = []; 
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  filterSuggestions() {    
    if (this.inputText.trim() == '' || this.inputText.length==0) {
      this.filteredSuggestions=[];
    } else {
      this.filteredSuggestions = this.suggestions.filter((item:any) =>
        item.organization.toLowerCase().includes(this.inputText.toLowerCase())
      );
    }
  }

  selectSuggestion(suggestion: any) {
    this.inputText = suggestion.email;
    this.addReferrer();
    this.filteredSuggestions = []; 
  }


  onKeyDown(event: KeyboardEvent) {
    
    switch (event.key) {
      case 'ArrowDown':
        if (this.selectedIndex < this.filteredSuggestions.length - 1) {
          this.selectedIndex++;
          this.scrollToSelected();
        }
        break;
      case 'ArrowUp':
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
          this.scrollToSelected();

        }
        break;
      case 'Enter':
        if (this.selectedIndex > -1 && this.filteredSuggestions[this.selectedIndex]) {
          this.selectSuggestion(this.filteredSuggestions[this.selectedIndex]);
        }
        break;
    }
  }

  scrollToSelected(): void {
    const suggestionList = document.querySelector('.suggestions');
    const selectedItem = suggestionList?.querySelector('.selected');
    if (selectedItem) {
      // Ensure the DOM is updated before scrolling
      this.cdr.detectChanges();  // Trigger Angular's change detection to update the view
      selectedItem.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'center'    // Scroll to bring the selected item into view
      });
    }
  }

}
