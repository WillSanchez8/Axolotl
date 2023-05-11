import { TestBed } from '@angular/core/testing';

import { NounPexelsService } from './noun-pexels.service';

describe('NounPexelsService', () => {
  let service: NounPexelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NounPexelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
