import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'learning-portal',
  templateUrl: './learning-portal.component.html',
  styleUrls: ['./learning-portal.component.css']
})
export class LearningPortalComponent {

  showAllTechCards = false;
  showNoLinkToolTip:any; 
  techStacks:any;

  constructor(private http:HttpClient){
        this.getTechCards();
  }

  getTechCards(){
    this.http.get("/assets/data/techCards.json").subscribe({
      next:(response:any) => {
        this.techStacks=response.techCards
      },
      error:(err:any) => {      
        console.log(err)
      }
    })
  }
  showMoreTechCards() {
    this.showAllTechCards = !this.showAllTechCards;
  }

  get displayedTechStacks() {
    return this.showAllTechCards ? this.techStacks : this.techStacks.slice(0, 4);
  }

}
