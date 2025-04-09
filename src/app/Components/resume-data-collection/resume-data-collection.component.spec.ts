import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDataCollectionComponent } from './resume-data-collection.component';

describe('ResumeDataCollectionComponent', () => {
  let component: ResumeDataCollectionComponent;
  let fixture: ComponentFixture<ResumeDataCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeDataCollectionComponent]
    });
    fixture = TestBed.createComponent(ResumeDataCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
