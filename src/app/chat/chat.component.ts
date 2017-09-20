import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { SocketService } from '../app.service';
import { GlobalObjectsService } from "../app.service.global";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
/*  message = {
    time:"",
    content:"",
    author:"",
    message:"",
    name:"",
  };*/
  type = 1;
  message: string;
  constructor(private socket: SocketService, public globalVar: GlobalObjectsService) { }

    save(){
        this.socket.emit("messages:add", {
            user: {name: this.globalVar.activeUser.name},
            add: {
                message: this.message,
                type:this.type
            }
        });
        this.message = "";
        this.type = 1;
    }

    loadOldMessages(){
        this.socket.emit('messages:loadOld', this.globalVar.user.chatMessages[this.globalVar.user.chatMessages.length - 1 ].time);
    }
    ngOnInit() {}
}

/*
@Pipe({name:'chatText', pure: false})
export class chatText implements PipeTransform{
    transform(value: any, args: any[] = null): any {
        var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
            '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
            '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
            '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
            '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
            '(\#[-a-z\d_]*)?$','i'); // fragment locater
        if(!pattern.test(value)) {
            return false;
        } else {
            return true;
        }
    }
}
*/