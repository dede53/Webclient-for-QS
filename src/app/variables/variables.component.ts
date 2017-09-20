import { Component, OnInit } from '@angular/core';
import { GlobalObjectsService } from "../app.service.global";
import { SocketService } from "../app.service";

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  constructor(public globalVar: GlobalObjectsService, public socket: SocketService) { }

  ngOnInit() {
      this.socket.on("variables", data => {
            switch(data.type){
                case "edit":
                    if(this.globalVar.user.favoritVariables[data.edit.id]){
                        this.globalVar.user.favoritVariables[data.edit.id] = data.edit;
                    }
                    break;
                default:
                    break;
            }
      })
  }

}
