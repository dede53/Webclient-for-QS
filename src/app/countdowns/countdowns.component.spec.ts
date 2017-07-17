import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownsComponent } from './countdowns.component';

describe('CountdownsComponent', () => {
  let component: CountdownsComponent;
  let fixture: ComponentFixture<CountdownsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
