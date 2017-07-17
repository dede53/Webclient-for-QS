import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDevicesComponent } from './active-devices.component';

describe('ActiveDevicesComponent', () => {
  let component: ActiveDevicesComponent;
  let fixture: ComponentFixture<ActiveDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
