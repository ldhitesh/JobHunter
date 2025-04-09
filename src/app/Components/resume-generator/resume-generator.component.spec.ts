import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGeneratorComponent } from './resume-generator.component';

describe('ResumeGeneratorComponent', () => {
  let component: ResumeGeneratorComponent;
  let fixture: ComponentFixture<ResumeGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeGeneratorComponent]
    });
    fixture = TestBed.createComponent(ResumeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
