import { TestBed } from '@angular/core/testing';

import { SpotifycommService } from './spotifycomm.service';

describe('SpotifycommService', () => {
  let service: SpotifycommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifycommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
