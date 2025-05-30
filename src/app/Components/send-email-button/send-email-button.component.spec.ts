import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailButtonComponent } from './send-email-button.component';

describe('SendEmailButtonComponent', () => {
  let component: SendEmailButtonComponent;
  let fixture: ComponentFixture<SendEmailButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendEmailButtonComponent]
    });
    fixture = TestBed.createComponent(SendEmailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
