import { TestBed, async, inject } from '@angular/core/testing';

import { AuthDspsGuard } from './auth-dsps.guard';

describe('AuthDspsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDspsGuard]
    });
  });

  it('should ...', inject([AuthDspsGuard], (guard: AuthDspsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
