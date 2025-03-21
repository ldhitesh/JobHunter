import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDesignComponent } from './system-design.component';

describe('SystemDesignComponent', () => {
  let component: SystemDesignComponent;
  let fixture: ComponentFixture<SystemDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDesignComponent]
    });
    fixture = TestBed.createComponent(SystemDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
