import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusCheckServiceService {

  constructor() { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); 
  private RoleSubjext = new BehaviorSubject<string>(''); 

  isLoggedIn = this.isLoggedInSubject.asObservable(); 
  Role = this.RoleSubjext.asObservable(); 

  login(): void {
    this.isLoggedInSubject.next(true); 
  }

  RoleCheck(role:string){    
    this.RoleSubjext.next(role);
  }

}
