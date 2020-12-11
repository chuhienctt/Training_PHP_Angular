import { TestBed } from '@angular/core/testing';

import { FeildService } from './feild.service';

describe('FeildService', () => {
  let service: FeildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
