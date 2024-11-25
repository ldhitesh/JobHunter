import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailsComponent } from './send-emails.component';

describe('SendEmailsComponent', () => {
  let component: SendEmailsComponent;
  let fixture: ComponentFixture<SendEmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendEmailsComponent]
    });
    fixture = TestBed.createComponent(SendEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
