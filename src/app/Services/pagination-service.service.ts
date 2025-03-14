import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  private currentPageSubject = new BehaviorSubject<number>(1); // Initial page is 1
  currentPage$ = this.currentPageSubject.asObservable();

  constructor() {
   
  }

  // Method to change the page
  changePage(pageNumber: number): void {
    this.currentPageSubject.next(pageNumber);
  }
}
