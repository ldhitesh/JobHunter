import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebapidashboardComponent } from './webapidashboard.component';

describe('WebapidashboardComponent', () => {
  let component: WebapidashboardComponent;
  let fixture: ComponentFixture<WebapidashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebapidashboardComponent]
    });
    fixture = TestBed.createComponent(WebapidashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
