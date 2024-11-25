import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferenceFormComponent } from './add-reference-form.component';

describe('AddReferenceFormComponent', () => {
  let component: AddReferenceFormComponent;
  let fixture: ComponentFixture<AddReferenceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReferenceFormComponent]
    });
    fixture = TestBed.createComponent(AddReferenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
