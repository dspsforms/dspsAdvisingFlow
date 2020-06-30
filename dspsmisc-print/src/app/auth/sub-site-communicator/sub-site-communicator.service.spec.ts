import { TestBed } from '@angular/core/testing';

import { SubSiteCommunicatorService } from './sub-site-communicator.service';

describe('SubSiteCommunicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubSiteCommunicatorService = TestBed.get(SubSiteCommunicatorService);
    expect(service).toBeTruthy();
  });
});
