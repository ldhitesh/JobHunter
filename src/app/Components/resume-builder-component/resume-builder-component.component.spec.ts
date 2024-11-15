import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderComponentComponent } from './resume-builder-component.component';

describe('ResumeBuilderComponentComponent', () => {
  let component: ResumeBuilderComponentComponent;
  let fixture: ComponentFixture<ResumeBuilderComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeBuilderComponentComponent]
    });
    fixture = TestBed.createComponent(ResumeBuilderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
