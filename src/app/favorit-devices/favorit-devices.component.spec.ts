import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritDevicesComponent } from './favorit-devices.component';

describe('FavoritDevicesComponent', () => {
  let component: FavoritDevicesComponent;
  let fixture: ComponentFixture<FavoritDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
