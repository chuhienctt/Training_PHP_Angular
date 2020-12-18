import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeildComponent } from './feild.component';

describe('FeildComponent', () => {
  let component: FeildComponent;
  let fixture: ComponentFixture<FeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
