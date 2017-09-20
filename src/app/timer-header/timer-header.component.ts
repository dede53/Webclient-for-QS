import { Component, OnInit, Input } from '@angular/core';
import { GlobalObjectsService } from "../app.service.global";
import { SocketService } from "../app.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-timer-header',
    templateUrl: './timer-header.component.html',
    styleUrls: ['./timer-header.component.css']
})
export class TimerHeaderComponent implements OnInit {
    @Input() timer: any;
    constructor(
        private router: Router,
        public globalVar: GlobalObjectsService,
        private socket: SocketService){
    }

    ngOnInit() {
        this.timer.isCollapsed = true;
    }
    switchTimer(data){
        if(data.active == "true"){
            data.active = "false";
        }else{
            data.active = "true";
        }
        this.socket.emit('timers:switch', {user:this.globalVar.activeUser, switch: data});
    }

    removeTimer(data){
        this.socket.emit('timers:remove', {user:this.globalVar.activeUser, remove: data});
    }
    editTimer(id){
        this.router.navigate(['/editTimer', id]);
    }
}
