import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyButtonComponent } from './add-company-button.component';

describe('AddCompanyButtonComponent', () => {
  let component: AddCompanyButtonComponent;
  let fixture: ComponentFixture<AddCompanyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompanyButtonComponent]
    });
    fixture = TestBed.createComponent(AddCompanyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
