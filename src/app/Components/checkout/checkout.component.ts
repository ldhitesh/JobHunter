import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/Services/payment-service.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @Input() registerDetails: any ;
  @Input() payNowButtonActive: boolean=false ;


  constructor(private http:HttpClient,private paymentService: PaymentService){}

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  async checkout() {
    this.paymentService.createCheckoutSession(this.registerDetails).subscribe(
      async (response) => {
        const stripe = await loadStripe('pk_test_51QRTA0GrGPg4V8UdaflMGQRw0KwbdwSNY9v2b86KOdTrI3pI6apnWPDYFrPVPdZLiS4W9ORx5CRrXXVdJHMcrC7o00fYKVKaH6');

        if (stripe) {
          await stripe.redirectToCheckout({
            sessionId: response.sessionId,
          }).then(function (result: any) {
            if (result.error) {
              console.log(result.error.message);
            }
          });
        } else {
          console.error('Stripe.js failed to load');
        }
        
  });

  }
}