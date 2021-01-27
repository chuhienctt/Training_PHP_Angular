import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProfileComponent } from './send-profile.component';

describe('SendProfileComponent', () => {
  let component: SendProfileComponent;
  let fixture: ComponentFixture<SendProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
