import { TestBed } from '@angular/core/testing';

import { FormsService0 } from './forms0.service';

describe('FormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsService0 = TestBed.get(FormsService0);
    expect(service).toBeTruthy();
  });
});
