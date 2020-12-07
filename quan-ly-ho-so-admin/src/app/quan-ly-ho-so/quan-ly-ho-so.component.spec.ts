import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';

describe('QuanLyHoSoComponent', () => {
  let component: QuanLyHoSoComponent;
  let fixture: ComponentFixture<QuanLyHoSoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyHoSoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyHoSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
