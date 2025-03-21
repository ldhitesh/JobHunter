import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactComponent } from './react.component';

describe('ReactComponent', () => {
  let component: ReactComponent;
  let fixture: ComponentFixture<ReactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactComponent]
    });
    fixture = TestBed.createComponent(ReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
