import { TestBed, async, inject } from '@angular/core/testing';

import { AuthInstructorGuard } from './auth-instructor.guard';

describe('AuthInstructorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInstructorGuard]
    });
  });

  it('should ...', inject([AuthInstructorGuard], (guard: AuthInstructorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
