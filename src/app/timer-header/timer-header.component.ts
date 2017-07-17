import { Component, OnInit, Input } from '@angular/core';
import { GlobalObjectsService } from "../app.service.global";
import { SocketService } from "../app.service";
import { Router, Params } from "@angular/router";

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
      //this.timer.edit = false;
      //this.timer.editMode = "mode_edit";
      this.timer.isCollapsed = true;
  }
    addTimer(){
        this.router.navigate(['/timer']);        
    }
    switchTimer(data){
        console.log(this);
        if(data.active == "true"){
            data.active = "false";
        }else{
            data.active = "true";
        }
        this.socket.emit('timers:switch', {user:this.globalVar.activeUser, switch: data});
    }
    
    removeTimer(data){
        this.socket.emit('timers:remove', {user:this.globalVar.activeUser, remove: data.id});
    }
    editTimer(id){
        this.router.navigate(['/editTimer', id]);
    }
}
