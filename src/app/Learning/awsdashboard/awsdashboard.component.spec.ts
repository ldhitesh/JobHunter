import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsdashboardComponent } from './awsdashboard.component';

describe('AwsdashboardComponent', () => {
  let component: AwsdashboardComponent;
  let fixture: ComponentFixture<AwsdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwsdashboardComponent]
    });
    fixture = TestBed.createComponent(AwsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
