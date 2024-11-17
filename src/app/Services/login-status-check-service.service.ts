import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusCheckServiceService {

  constructor() { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); 
  isLoggedIn = this.isLoggedInSubject.asObservable(); 

  login(): void {
    this.isLoggedInSubject.next(true); 
  }

}
