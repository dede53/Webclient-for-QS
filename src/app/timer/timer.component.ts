/* import {OnChanges, Component, Directive, OnInit, Input } from '@angular/core';
import { GlobalObjectsService } from "app/app.service.global";
import { SocketService } from "app/app.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{

    @Input() timer: any;
    constructor(
        public socket: SocketService,
        public globalVar: GlobalObjectsService ) {
    }
    ngOnInit(){
        this.globalVar.user.timers[this.timer.id].edit = false;
        this.globalVar.user.timers[this.timer.id].editMode = "mode_edit";
    }
    actions = [
        {value:"devices", name:"Gerät"},
        {value:"groups", name:"Gruppe"},
        {value:"rooms", name:"Raum"},
        {value:"alerts", name:"Alert"}
    ]

    addAction(timerId, type){
        if(this.globalVar.user.timers[timerId].actions[type] === undefined){
            this.globalVar.user.timers[timerId].actions[type] = [];
        }
        this.globalVar.user.timers[timerId].actions[type].push({
            type: type,
            activeInterval: false,
            activeTimeout: false,
            timeout: 0,
            action: {
                type: "primary"
            }
        });
    }
}

@Component({
  selector: 'app-timer-random',
  styleUrls: ['./timer.component.css'],
  templateUrl: './timer-random.html'
})
export class TimerRandomComponent {
  @Input() condition: any;
  @Input() edit: boolean;
}

@Component({
    selector: 'app-timer-time',
    styleUrls: ['./timer.component.css'],
    templateUrl: './timer-time.html'
})
export class TimerTimeComponent {
    @Input() condition: any;
    @Input() edit: boolean;
    @Input() index: any;
    realTime = "06:12";
    time = {
        minute: 12,
        hour: 6
    }
    setTime(){
        this.realTime =  this.time.hour + ":" + this.time.minute;
        this.condition.time = this.time.hour + ":" + this.time.minute;
    }
    ngOnInit(){
            var splittedTime = this.condition.time.split(":");
            this.time = {
                hour: splittedTime[0],
                minute: splittedTime[1]
            }
    }
}

@Component({
  selector: 'app-timer-alert',
  styleUrls: ['./timer.component.css'],
  templateUrl: './timer-alert.html'
})
export class TimerAlertComponent {
    @Input() action: any;
    @Input() index: Number;
    @Input() timer: any;
    constructor(
        private timerFunctions: TimerFunctionsService,
        public globalVar: GlobalObjectsService
    ){

    }
    alertTypen = [
        {value:'primary', name:'Blau/Primary'},
        {value:'info', name:'Hellblau/Info'},
        {value:'success', name:'Grün/Success'},
        {value:'warning', name:'Gelb/Warning'},
        {value:'danger', name:'Rot/Danger'},
        {value:'secondary', name:'Weiß/Default'}
    ]
}

@Component({
  selector: 'app-timer-device',
  styleUrls: ['./timer.component.css'],
  templateUrl: './timer-device.html'
})
export class TimerDeviceComponent {
    @Input() action: any;
    @Input() index: Number;
    @Input() timer: any;
    constructor(
        private socket: SocketService,
        public globalVar: GlobalObjectsService
    ){}
    ngOnInit(){
        this.socket.emit("devices:devicelist", "");
    }

    updateDevice(){
        console.log(this.globalVar.user.devicelist[this.action.action.deviceid]);
        this.action.action = this.globalVar.user.devicelist[this.action.action.deviceid];
    }
}

@Component({
    selector: 'app-timer-group',
    styleUrls: ['./timer.component.css'],
    templateUrl: './timer-group.html'
})
export class TimerGroupComponent{
    @Input() action: any;
    @Input() index: Number;
    @Input() timer: any;
    constructor(
        private socket: SocketService,
        public globalVar: GlobalObjectsService
    ){}
    ngOnInit(){
        //this.socket.emit("groups:get", "");
    }
    updateGroup(){
        this.action.action = this.globalVar.user.groups[this.action.action.id];
    }
}

@Component({
    selector:'app-timer-variable-onchange',
    styleUrls: ['./timer.component.css'],
    templateUrl: "./timer-variable-onchange.html"
})
export class TimerVariableOnchangeComponent {
    @Input() variable: any;
    @Input() edit: boolean;
    constructor(public globalVar: GlobalObjectsService ){}
}

@Component({
    selector:'app-timer-variable-match',
    styleUrls: ['./timer.component.css'],
    templateUrl: "./timer-variable-match.html"
})
export class TimerVariableMatchComponent {
    @Input() variable: any;
    @Input() edit: boolean;
    constructor(
        public socket: SocketService,
        public globalVar: GlobalObjectsService) {
    }
    ngOnInit(){
        this.socket.emit("variables:get", "object");
    }
} */