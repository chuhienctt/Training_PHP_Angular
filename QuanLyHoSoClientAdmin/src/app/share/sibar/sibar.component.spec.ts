import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SibarComponent } from './sibar.component';

describe('SibarComponent', () => {
  let component: SibarComponent;
  let fixture: ComponentFixture<SibarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SibarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
