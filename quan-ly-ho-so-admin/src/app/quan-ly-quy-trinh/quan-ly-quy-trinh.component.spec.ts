import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyQuyTrinhComponent } from './quan-ly-quy-trinh.component';

describe('QuanLyQuyTrinhComponent', () => {
  let component: QuanLyQuyTrinhComponent;
  let fixture: ComponentFixture<QuanLyQuyTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyQuyTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
