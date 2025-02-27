import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationCompleteComponent } from './email-verification-complete.component';

describe('EmailVerificationCompleteComponent', () => {
  let component: EmailVerificationCompleteComponent;
  let fixture: ComponentFixture<EmailVerificationCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerificationCompleteComponent]
    });
    fixture = TestBed.createComponent(EmailVerificationCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
