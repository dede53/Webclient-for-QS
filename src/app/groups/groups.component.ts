import { Component, Input } from '@angular/core';
import { SocketService } from "../app.service";
import { GlobalObjectsService } from "../app.service.global";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  // @Input() groups: any;
  constructor(private socket: SocketService, public globalVar: GlobalObjectsService) { }
  switchGroup(event: Event, data){
    event.preventDefault();
    console.log("Raum schalten!");
    this.socket.emit("groups:switch", {switch: data});
    event.stopPropagation();
  }
}