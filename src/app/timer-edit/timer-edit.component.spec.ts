import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerEditComponent } from './timer-edit.component';

describe('TimerEditComponent', () => {
  let component: TimerEditComponent;
  let fixture: ComponentFixture<TimerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
