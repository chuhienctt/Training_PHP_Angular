import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyThuTucComponent } from './quan-ly-thu-tuc.component';

describe('QuanLyThuTucComponent', () => {
  let component: QuanLyThuTucComponent;
  let fixture: ComponentFixture<QuanLyThuTucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyThuTucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyThuTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
