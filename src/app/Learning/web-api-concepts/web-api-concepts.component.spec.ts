import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebApiConceptsComponent } from './web-api-concepts.component';

describe('WebApiConceptsComponent', () => {
  let component: WebApiConceptsComponent;
  let fixture: ComponentFixture<WebApiConceptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebApiConceptsComponent]
    });
    fixture = TestBed.createComponent(WebApiConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
