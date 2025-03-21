import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcsFargateComponent } from './ecs-fargate.component';

describe('EcsFargateComponent', () => {
  let component: EcsFargateComponent;
  let fixture: ComponentFixture<EcsFargateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcsFargateComponent]
    });
    fixture = TestBed.createComponent(EcsFargateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
