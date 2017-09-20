import { SocketService } from "../app.service";
import { Component, Input } from '@angular/core';
import { GlobalObjectsService } from "../app.service.global";


@Component({
  selector: 'app-switch-button',
  styleUrls: ['./device.component.css'],
  templateUrl: './switch-button.html'
  
})
export class SwitchButtonComponent{
  constructor(private socket: SocketService, public globalVar: GlobalObjectsService) { }
  @Input() device: any;
  switchDevice(data){
    this.socket.emit("devices:switch", {user:{name:this.globalVar.activeUser.name}, switch: data});
  }
}

@Component({
    selector: 'app-shutter',
    styleUrls: ['./device.component.css'],
    templateUrl: './shutter.html'
})
export class ShutterComponent {
    constructor (private socket: SocketService, public globalVar: GlobalObjectsService) {}
    @Input() device: any;
    switchDevice(data){
        this.socket.emit("devices:switch", {user:{name:this.globalVar.activeUser.name}, switch: data});
    }
}

@Component({
    selector: 'app-dimmer',
    styleUrls: ['./device.component.css'],
    templateUrl: './dimmer.html'
})
export class DimmerComponent {
    constructor (private socket: SocketService, public globalVar: GlobalObjectsService) {}
    @Input() device: any;
    switchDevice(data){
        this.socket.emit("devices:switch", {user:{name:this.globalVar.activeUser.name}, switch: data});
    }
}