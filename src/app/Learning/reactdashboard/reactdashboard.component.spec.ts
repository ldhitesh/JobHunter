import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactdashboardComponent } from './reactdashboard.component';

describe('ReactdashboardComponent', () => {
  let component: ReactdashboardComponent;
  let fixture: ComponentFixture<ReactdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactdashboardComponent]
    });
    fixture = TestBed.createComponent(ReactdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
