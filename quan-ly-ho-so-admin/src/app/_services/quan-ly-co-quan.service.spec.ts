import { TestBed } from '@angular/core/testing';

import { QuanLyCoQuanService } from './quan-ly-co-quan.service';

describe('QuanLyCoQuanService', () => {
  let service: QuanLyCoQuanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyCoQuanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
