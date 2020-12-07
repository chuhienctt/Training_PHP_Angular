import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyLinhVucComponent } from './quan-ly-linh-vuc.component';

describe('QuanLyLinhVucComponent', () => {
  let component: QuanLyLinhVucComponent;
  let fixture: ComponentFixture<QuanLyLinhVucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyLinhVucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyLinhVucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
