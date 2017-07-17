import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchButtonComponent } from './device.component';

describe('DeviceComponent', () => {
    let component: SwitchButtonComponent;
    let fixture: ComponentFixture<SwitchButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SwitchButtonComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
