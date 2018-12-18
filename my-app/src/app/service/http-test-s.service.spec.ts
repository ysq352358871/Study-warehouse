import { TestBed, inject } from '@angular/core/testing';

import { HttpTestSService } from './http-test-s.service';

describe('HttpTestSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpTestSService]
    });
  });

  it('should be created', inject([HttpTestSService], (service: HttpTestSService) => {
    expect(service).toBeTruthy();
  }));
});
