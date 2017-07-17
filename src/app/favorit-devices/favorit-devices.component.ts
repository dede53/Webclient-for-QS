import { Component, Input } from '@angular/core';
import { SocketService } from "../app.service";
import { GlobalObjectsService } from "../app.service.global";

@Component({
  selector: 'app-favorit-devices',
  templateUrl: './favorit-devices.component.html',
  styleUrls: ['./favorit-devices.component.css']
})
export class FavoritDevicesComponent{
  constructor(public globalVar: GlobalObjectsService) {}
}