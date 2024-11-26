import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupwindowComponent } from './popupwindow.component';

describe('PopupwindowComponent', () => {
  let component: PopupwindowComponent;
  let fixture: ComponentFixture<PopupwindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupwindowComponent]
    });
    fixture = TestBed.createComponent(PopupwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
