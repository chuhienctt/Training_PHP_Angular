import { TestBed } from '@angular/core/testing';

import { QuanLyLinhVucService } from './quan-ly-linh-vuc.service';

describe('QuanLyLinhVucService', () => {
  let service: QuanLyLinhVucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyLinhVucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
