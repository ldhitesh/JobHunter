import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferenceButtonComponent } from './add-reference-button.component';

describe('AddReferenceButtonComponent', () => {
  let component: AddReferenceButtonComponent;
  let fixture: ComponentFixture<AddReferenceButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReferenceButtonComponent]
    });
    fixture = TestBed.createComponent(AddReferenceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
