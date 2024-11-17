import { TestBed } from '@angular/core/testing';

import { LoginStatusCheckServiceService } from './login-status-check-service.service';

describe('LoginStatusCheckServiceService', () => {
  let service: LoginStatusCheckServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStatusCheckServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
