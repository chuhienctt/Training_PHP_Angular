import { TestBed } from '@angular/core/testing';

import { LinhvucService } from './linhvuc.service';

describe('LinhvucService', () => {
  let service: LinhvucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinhvucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
