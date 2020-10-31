import { TestBed } from '@angular/core/testing';

import { ExternalcommService } from './externalcomm.service';

describe('ExternalcommService', () => {
  let service: ExternalcommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalcommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
