import { Component } from '@angular/core';
import { GlobalObjectsService } from "../app.service.global";
import { Router } from "@angular/router";

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css']
})
export class TimersComponent {

    constructor(
        private router: Router,
        public globalVar: GlobalObjectsService) { }

    addTimer(){
        this.router.navigate(['/editTimer']);
    }
}