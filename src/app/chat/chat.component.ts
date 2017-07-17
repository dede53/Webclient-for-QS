import { Component, Pipe, PipeTransform } from '@angular/core';
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
  messages = [];
  type = 1;
  moreMessagesAvailable = true;
  message: string;
  constructor(private socket: SocketService, public globalVar: GlobalObjectsService) { }

  save(){
    console.log(this.message);
    console.log(this.type);
    this.socket.emit("messages:add", {
      user: {name:"Daniel"},
      add: {
        message: this.message,
        type:this.type
      }
    });
  }

  loadOldMessages(){
    this.socket.emit('messages:loadOld', this.globalVar.user.chatMessages[this.globalVar.user.chatMessages.length - 1 ].time);
  }
  ngOnInit() {
    this.socket.emit("messages:loadOld", new Date().getTime());
/*     this.socket.on('chatMessages', data => {
      this.messages.splice(0, 0, data[data.type]);
    }) */
    this.socket.on('moreMessagesAvailable', data => {
      this.moreMessagesAvailable = data;
    })
  }
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