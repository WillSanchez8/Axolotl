import { TestBed } from '@angular/core/testing';

import { PexelsServiceService } from './pexels-service.service';

describe('PexelsServiceService', () => {
  let service: PexelsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PexelsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
