import { Component, OnInit , Pipe, PipeTransform } from '@angular/core';
import { SocketService } from "../app.service";
import { GlobalObjectsService } from "../app.service.global";

@Pipe({ name: 'ObjNgFor',  pure: false })
export class ObjNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
      if(value){
        return Object.keys(value).map(key => value[key]);
      }else{
          return;
      }
    }
}
/*
@Pipe({ name: 'TimerTime',  pure: false })
export class TimerTime implements PipeTransform {
    transform(value: any, args: any[] = null): string {
        if(value.time == "sunset"|| value.time == "sunrise"){
            if(value.time == "sunrise"){
                var data = "Sonnenaufgang";
            }else{
                var data = "Sonnenuntergang";
            }
            if(value.offset.active){
                if(value.offset.after){
                    var offset = "nach ";
                }else{
                    var offset = "vor ";
                }
                if(value.offset.random){
                    // Zwischen 2 und 5 Minuten nach/vor data;
                    return value.offset.min + "-" + value.offset.max + " Minuten " + offset + data;
                }else{
                    return value.offset.minutes + " Minuten " + offset + data;
                }
            }else{
                return "Zum " + data;
            }
        }else{
            if(value.offset.active){
                if(value.offset.after){
                    var offset = "nach ";
                }else{
                    var offset = "vor ";
                }
                if(value.offset.random){
                    // Zwischen 2 und 5 Minuten nach/vor data;
                    return value.offset.min + "-" + value.offset.max + " Minuten " + offset + data;
                }else{
                    return value.offset.minutes + " Minuten " + offset + data;
                }
            }else{
                return "Um " + value.time + "h";
            }
        }
    }
}*/

@Pipe({name:'isEmpty', pure: false})
export class isEmpty implements PipeTransform{
    transform(value: any, args: boolean): boolean {
            var result = true;
            for (let bar in value) {
                if (value.hasOwnProperty(bar)) {
                    result = false;
                }
            }
            if(args){
                return !result;
            }else{
                return result;
            }
    }
}

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
    constructor (private socket: SocketService, public globalVar: GlobalObjectsService) {}
    ngOnInit() {
        this.socket.emit('devices:get', "");
    }
    switchRoom(event: Event, data){
        event.preventDefault();
        this.socket.emit("rooms:switch", {switch: data});
        event.stopPropagation();
    }
}


