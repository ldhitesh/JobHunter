import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusCheckServiceService {

  constructor() { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); 
  private RoleSubjext = new BehaviorSubject<string>(''); 
  private isVerifiedLinkSubject = new BehaviorSubject<boolean>(false); 

  isLoggedIn = this.isLoggedInSubject.asObservable(); 
  verifiedLinkState=this.isVerifiedLinkSubject.asObservable();
  Role = this.RoleSubjext.asObservable(); 

  login(): void {
    this.isLoggedInSubject.next(true); 
  }

  verifiedlink(): void {
    this.isVerifiedLinkSubject.next(true); 
  }
  

  RoleCheck(role:string){    
    this.RoleSubjext.next(role);
  }

}
