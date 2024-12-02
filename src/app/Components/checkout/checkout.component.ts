import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @Input() registerDetails: any ;

  constructor(private http:HttpClient){}

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async openPaymentPage( ) {

    await this.sleep(3000);
    const paymentUrl = 'https://buy.stripe.com/test_eVa1560fT81I7qU4gg'; 
    window.location.href=paymentUrl;
  }

}