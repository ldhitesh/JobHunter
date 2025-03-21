import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailApiComponent } from './gmail-api.component';

describe('GmailApiComponent', () => {
  let component: GmailApiComponent;
  let fixture: ComponentFixture<GmailApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GmailApiComponent]
    });
    fixture = TestBed.createComponent(GmailApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
