import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:80/api/payment/create-checkout-session';
  
  constructor(private http: HttpClient) { }

  createCheckoutSession(registerDetails:any) {
    return this.http.post<any>(this.apiUrl,registerDetails);
  }
}
