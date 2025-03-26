import { Component } from '@angular/core';
import { NotificationServiceService } from 'src/app/Services/notification-service.service';

@Component({
  selector: 'global-notifications',
  templateUrl: './global-notifications.component.html',
  styleUrls: ['./global-notifications.component.css']
})
export class GlobalNotificationsComponent {
  notificationMessage:string='Email sent successfully!';

  constructor(private notificationService: NotificationServiceService){}


  ngOnInit(): void {      
    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;      
    });
    
  }
  closeModal(){
    this.notificationMessage='';
  }
}
