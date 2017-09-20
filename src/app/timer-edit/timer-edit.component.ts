import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalObjectsService } from "app/app.service.global";
import { SocketService } from "app/app.service";

@Component({
  selector: 'app-timer-edit',
  templateUrl: './timer-edit.component.html',
  styleUrls: ['./timer-edit.component.css']
})
export class TimerEditComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public globalVar: GlobalObjectsService,
        private socket: SocketService){}
    actions = [
        {value:"device", name:"Gerät"},
        {value:"group", name:"Gruppe"},
        {value:"room", name:"Raum"},
        {value:"alert", name:"Alert"},
        {value:"url", name:"Url aufrufen"},
        {value:"setVariable", name:"Variablen Wert setzen"},
		{value:"pushbullets", name:"Pushbulletbenachrichigung"}
    ]
    id:number;
    timer:Timer;
    
    addActionType = "false";
    addVariableType = "false";
    addConditionType = "false";
    variables: Array<object>;
    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || undefined;
        if(this.id){
            this.socket.emit("timers:get", {"get":this.id});
            this.socket.on('timer', data => {
                console.log(data);
                if(this.id === parseInt(data[data.type].id)){
                    this.timer = data[data.type];
                }
            });
        }else{
            this.timer = {
                name:"",
                id:undefined,
                variables: false,
                conditions:[],
                actions:[],
                user: this.globalVar.activeUser.name
            }
        }
        this.socket.emit("variables:get", "");
        this.socket.on("variables", data => {
            if(data.type == "get"){
                this.variables = data.get;
            }
        });
    }

    addAction(type){
        if(type  != "false"){
            if(!this.timer.actions){
                this.timer.actions = [];
            }
            this.timer.actions.push({
                type: type,
                activeInterval: false,
                unit: "min",
                number: 5,
                switchstatus: false,
                action: {},
                offset:{
                    active:false,
                    random: false,
                    after:true,
                    min:2,
                    max:5,
                    minutes:4
                }
            });
        }
    }
    addVariable(id){
        if(id != "false"){
            if(!this.timer.variables){
                this.timer.variables = {};
            }
            if(!this.timer.variables[id]){
                this.timer.variables[id] = [];
            }
            this.timer.variables[id].push({
                id:id,
                mode:"onChange"
            });
        }
    }
    addCondition(type){
        if(type != "false"){
            if(!this.timer.conditions){
                this.timer.conditions = [];
            }
            this.timer.conditions.push({
                type:type,
                offset:{
                    active:false,
                    random: false,
                    after:true,
                    min:2,
                    max:5,
                    minutes:4
                },
                weekdays:[false,false,false,false,false,false,false]
            });
        }
    }
    removeAction(index){
        this.timer.actions.splice(index, 1);
    }
    removeCondition(index){
        this.timer.conditions.splice(index, 1);
    }
    removeVariable(id, index){
        this.timer.variables[id].splice(index, 1);
        if(this.timer.variables[id].length == 0){
            delete this.timer.variables[id];
        }
        for(let index in this.timer.variables){
            if (this.timer.variables.hasOwnProperty(index)) {
                return;
            }
        }
        this.timer.variables = false;
    }
    save(){
        console.log(this.timer);
        this.socket.emit('timers:save', {user:this.globalVar.activeUser, save: this.timer});
        this.router.navigate(['/timers']);
    }
    cancel(){
        this.router.navigate(['/timers']);
    }

	switchAll = function(type, data){
		this.socket.emit(type + ':switchAll', {user:this.globalVar.activeUser, switchAll: data});	
	}
    variableModes = [
        {value:"match", name:"match (deprected)"},
        {value:"onChange", name:"sich ändert (onChange)"},
        {value:"größer", name:"größer als"},
        {value:"kleiner", name:"kleiner als"},
        {value:"gleich", name:"gleich"},
        {value:"ungleich", name:"ungleich"},
        {value:"kleinergleich", name:"kleiner oder gleich"},
        {value:"größergleich", name:"größer oder gleich"}
    ]
    conditions = [
        {value:"range", name:"Zeitraum"},
        {value:"sun", name:"Sonnenaufgang/Untergang"},
        {value:"random", name:"Zufälliger Zeitpunkt in einem Zeitraum"},
        {value:"variable", name:"Wert einer Variable"},
        {value:"time", name:"Zeit"},
        {value:"weekdays", name:"Wochentage"}
    ]
}


@Component({
    selector: 'app-timer-group',
    styleUrls: ['./timer-edit.component.css'],
    templateUrl: './templates/action-group.html'
})
export class TimerGroupComponent{
    @Input() action: any;
    constructor(
        private socket: SocketService,
        public globalVar: GlobalObjectsService
    ){}
    groups = {};
    ngOnInit(){
        this.socket.emit("groups:getAll", "");
        this.socket.on("groups", data => {
            this.groups = data.get;
            if(this.action.action.id && this.action.action != this.groups[this.action.action.id]){
                this.action.action = this.groups[this.action.action.id];
            }
        });
    }
}


@Component({
  selector: 'app-timer-device',
  styleUrls: ['./timer-edit.component.css'],
  templateUrl: './templates/action-device.html'
})
export class TimerDeviceComponent {
    @Input() action: any;
    devicelist:Array<object>;
    constructor(
        private socket: SocketService
    ){}
    ngOnInit(){
        this.socket.emit("devices:devicelist", "");
        this.socket.on("devicelist", data => {
            this.devicelist = data.get;
            if(this.action.action.deviceid && this.action.action != this.devicelist[this.action.action.deviceid]){
                this.action.action = this.devicelist[this.action.action.deviceid];
            }
        });
    }
}

@Component({
  selector: 'app-timer-alert',
  styleUrls: ['./timer-edit.component.css'],
  templateUrl: './templates/action-alert.html'
})
export class TimerAlertComponent {
    @Input() action: any;
    constructor(
        private socket: SocketService,
        public globalVar: GlobalObjectsService
    ){}
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
    selector: 'app-timer-room',
    styleUrls: ['./timer-edit.component.css'],
    templateUrl: './templates/action-room.html'
})
export class TimerRoomComponent{
    @Input() action: any;
    constructor(
        private socket: SocketService,
        public globalVar: GlobalObjectsService
    ){}
    devices = {};
    ngOnInit(){
        this.socket.emit("devices:get", "");
        this.socket.on("devices", data => {
            this.devices = data.get;
            if(this.action.action.id && this.action.action != this.devices[this.action.action.id]){
                this.action.action = this.devices[this.action.action.id];
            }
        });
    }
}

// @Component({
//     selector: 'app-timer-condition-variable',
//     styleUrls: ['./timer-edit.component.css'],
//     templateUrl: './templates/condition-variable.html'
// })
// export class TimerConditionVariableComponent{
//     @Input() condition: any;
//     constructor(
//         private socket: SocketService,
//         public globalVar: GlobalObjectsService
//     ){}
//     devices = {};
//     variables: Array<object>;
//     ngOnInit(){
//     }
// }