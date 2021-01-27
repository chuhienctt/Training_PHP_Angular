import { TestBed } from '@angular/core/testing';

import { SendProfileService } from './send-profile.service';

describe('SendProfileService', () => {
  let service: SendProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
