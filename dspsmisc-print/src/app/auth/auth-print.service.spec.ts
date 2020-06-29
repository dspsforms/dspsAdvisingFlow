import { TestBed } from '@angular/core/testing';

import { AuthPrintService } from './auth-print.service';

describe('AuthPrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthPrintService = TestBed.get(AuthPrintService);
    expect(service).toBeTruthy();
  });
});
