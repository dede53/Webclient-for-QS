import { Component, OnInit } from '@angular/core';
import { SocketService } from "../app.service";
import { GlobalObjectsService } from "../app.service.global";

@Component({
  selector: 'app-active-devices',
  templateUrl: './active-devices.component.html',
  styleUrls:["active-devices.component.css"]
})
export class ActiveDevicesComponent implements OnInit {

  activeDevices;

  constructor(private socket: SocketService, public globalVar: GlobalObjectsService) { }

  ngOnInit() {
    this.socket.emit("devices:active", undefined);
    this.socket.on('active', data => {
      this.activeDevices = data[data.type];
    });
  }
  switchAll(status){
    console.log(status);
    this.socket.emit("devices:switchAll", {switchAll:status});
  }
}

