import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqldashboardComponent } from './mysqldashboard.component';

describe('MysqldashboardComponent', () => {
  let component: MysqldashboardComponent;
  let fixture: ComponentFixture<MysqldashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MysqldashboardComponent]
    });
    fixture = TestBed.createComponent(MysqldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
