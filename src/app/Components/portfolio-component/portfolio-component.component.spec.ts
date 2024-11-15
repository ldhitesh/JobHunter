import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponentComponent } from './portfolio-component.component';

describe('PortfolioComponentComponent', () => {
  let component: PortfolioComponentComponent;
  let fixture: ComponentFixture<PortfolioComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioComponentComponent]
    });
    fixture = TestBed.createComponent(PortfolioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
