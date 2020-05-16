import { TestBed } from '@angular/core/testing';

import { DataTransformService } from './data-transform.service';

describe('DataTransformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTransformService = TestBed.get(DataTransformService);
    expect(service).toBeTruthy();
  });
});
