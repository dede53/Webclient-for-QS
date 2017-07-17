

import {Component} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'ngbd-datepicker-basic',
  templateUrl: './datepicker.component.html'
})
export class NgbdDatepickerBasic {

   /* constructor(private dateService: NgbDatepickerModule) {}*/

    uff: NgbDateStruct;
    date: {year: number, month: number};
    time:any;
    selectToday() {
        this.uff = {"year": now.getFullYear(), "month": now.getMonth() + 1, "day": 4};
        /*this.date.navigateTo({ year: now.getFullYear(), month: now.getMonth() + 1 });*/
    }
}

/*import {Component} from '@angular/core';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-tabset-preventchange',
  templateUrl: './tabset-preventchange.html'
})
export class NgbdTabsetPreventchange {
    public beforeChange($event: NgbTabChangeEvent) {
      if ($event.nextId === 'tab-preventchange2') {
        $event.preventDefault();
      }
    };
}*/
