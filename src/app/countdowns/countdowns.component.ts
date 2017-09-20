import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { GlobalObjectsService } from "../app.service.global";
import { SocketService } from "../app.service";

@Component({
    selector: 'app-countdowns',
    templateUrl: './countdowns.component.html',
    styleUrls: ['./countdowns.component.css']
})
export class CountdownsComponent implements OnInit {

    constructor(private socket: SocketService, public globalVar: GlobalObjectsService, private _fb: FormBuilder) {}
    public myForm: FormGroup;
    // devicelist;
    ngOnInit(){
    this.socket.emit('devices:devicelist', "");
    this.myForm = this._fb.group({
        time: [2],
        device: ['', Validators.required],
        status: 0
    });
    }
    add(countdown, valid){
        if(valid){
            console.log(this.globalVar.activeUser);
            countdown.user = this.globalVar.activeUser.name;
            this.socket.emit("countdowns:add", {user: this.globalVar.activeUser , add: countdown});
        }
    }
    remove(data){
        console.log(data);
        this.socket.emit("countdowns:remove", {user: this.globalVar.activeUser, remove: data});
    }
}
