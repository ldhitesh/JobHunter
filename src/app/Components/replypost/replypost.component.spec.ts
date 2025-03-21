import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplypostComponent } from './replypost.component';

describe('ReplypostComponent', () => {
  let component: ReplypostComponent;
  let fixture: ComponentFixture<ReplypostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplypostComponent]
    });
    fixture = TestBed.createComponent(ReplypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
