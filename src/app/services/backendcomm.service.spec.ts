import { TestBed } from '@angular/core/testing';

import { BackendcommService } from './backendcomm.service';

describe('BackendcommService', () => {
  let service: BackendcommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendcommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
