import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerHeaderComponent } from './timer-header.component';

describe('TimerHeaderComponent', () => {
  let component: TimerHeaderComponent;
  let fixture: ComponentFixture<TimerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
