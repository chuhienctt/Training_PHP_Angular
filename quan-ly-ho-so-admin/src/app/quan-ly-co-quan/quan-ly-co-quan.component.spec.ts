import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';

describe('QuanLyCoQuanComponent', () => {
  let component: QuanLyCoQuanComponent;
  let fixture: ComponentFixture<QuanLyCoQuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyCoQuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyCoQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
