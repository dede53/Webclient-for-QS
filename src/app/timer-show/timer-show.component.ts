import { Component, OnInit, Input } from '@angular/core';
import { GlobalObjectsService } from "app/app.service.global";
import { SocketService } from "app/app.service";

@Component({
  selector: 'app-timer-show',
  templateUrl: './timer-show.component.html',
  styleUrls: ['./timer-show.component.css']
})
export class TimerShowComponent{
    @Input() timer: any;
    constructor(
        public globalVar: GlobalObjectsService,
        private socket: SocketService
    ) {
    }
    weekdays = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ]
	switchAll = function(type, data){
		this.socket.emit(type + ':switchAll', {user:this.globalVar.activeUser, switchAll: data});	
	}
}
