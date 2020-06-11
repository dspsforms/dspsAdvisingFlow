import { TestBed, async, inject } from '@angular/core/testing';

import { IsloggedinGuardGuard } from './isloggedin-guard.guard';

describe('IsloggedinGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsloggedinGuardGuard]
    });
  });

  it('should ...', inject([IsloggedinGuardGuard], (guard: IsloggedinGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
