import { TestBed } from '@angular/core/testing';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';

describe('QuanLyNguoiDungService', () => {
  let service: QuanLyNguoiDungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyNguoiDungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
