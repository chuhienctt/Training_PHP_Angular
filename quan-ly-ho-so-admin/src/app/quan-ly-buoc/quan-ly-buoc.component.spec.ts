import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyBuocComponent } from './quan-ly-buoc.component';

describe('QuanLyBuocComponent', () => {
  let component: QuanLyBuocComponent;
  let fixture: ComponentFixture<QuanLyBuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyBuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyBuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
