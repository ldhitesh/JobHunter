import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesComponentComponent } from './companies-component.component';

describe('CompaniesComponentComponent', () => {
  let component: CompaniesComponentComponent;
  let fixture: ComponentFixture<CompaniesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesComponentComponent]
    });
    fixture = TestBed.createComponent(CompaniesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
