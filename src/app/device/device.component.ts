import { SocketService } from "../app.service";
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-switch-button',
  styleUrls: ['./device.component.css'],
  templateUrl: './switch-button.html'
  
})
export class SwitchButtonComponent{
  constructor(private socket: SocketService) { }
  @Input() device: any;
  switchDevice(data){
    this.socket.emit("devices:switch", {user:{name:"Daniel"}, switch: data});
  }
}

@Component({
  selector: 'app-shutter',
  styleUrls: ['./device.component.css'],
  templateUrl: './shutter.html'
})
export class ShutterComponent {
  constructor (private socket: SocketService) {}
  @Input() device: any;
  switchDevice(data){
    this.socket.emit("devices:switch", {user:{name:"Daniel"}, switch: data});
  }
}