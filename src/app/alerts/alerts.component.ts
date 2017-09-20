import { Component, Pipe, PipeTransform } from '@angular/core';
import { SocketService } from '../app.service';
import { GlobalObjectsService } from "../app.service.global";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
    constructor(public globalVar: GlobalObjectsService, private socket: SocketService){}
    remove(data){
        this.socket.emit('alerts:remove', {user:this.globalVar.activeUser, remove: data});	
    }
    removeAll(){
		this.socket.emit('alerts:removeAll', {user:this.globalVar.activeUser});
    }
}