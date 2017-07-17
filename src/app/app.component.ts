import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './app.service';
import { GlobalObjectsService } from "./app.service.global";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [GlobalObjectsService]
})

export class AppComponent {
    loading: boolean = false;
    constructor(private socket: SocketService, private globalVar: GlobalObjectsService ) { }
    private setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    private getCookie(cname: string) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
    setUser(){
        if(this.globalVar.activeUser.name != ""){
            console.log("leave:" + this.globalVar.activeUser.name);
            this.socket.emit('room:leave', this.globalVar.activeUser.name);
        }
        this.setCookie("qs-user", this.selectedUser, 365);
        console.log("join:" + this.users[this.selectedUser].name);
        this.socket.emit('room:join', this.users[this.selectedUser]);
        this.globalVar.activeUser = this.users[this.selectedUser];
    }
  
    // loaded = [];
    selectedUser: number = 0;
    connection;
    messages = [];
    users;
    devicelist;
    showFav:boolean = true;

    toogleFav(status){
        console.log(status);
        this.showFav = !status;
    }

    ngOnInit(){
        console.log(this.globalVar.user);
        this.socket.emit('users:get', "");
        this.socket.on('users', data => {
            this.users = data[data.type];
            this.loading = false;
            if(this.getCookie('qs-user') != ""){
                this.selectedUser = parseInt(this.getCookie('qs-user'));
                this.setUser();
            }else{
                console.log("No cookie!!");
            }
        });
        this.socket.on('all', data => {
            switch(data.type){
                case "get":
                    this.globalVar.user[data.masterType] = data.get;
                    break;
                case "add":
                    if(Array.isArray(this.globalVar.user[data.masterType])){
                        this.globalVar.user[data.masterType].push(data.add);
                    }else{
                        this.globalVar.user[data.masterType][data.add.id] = data.add;
                    }
                    break;
                case "remove":
                    delete this.globalVar.user[data.masterType][data.remove];
                    break;
                case "edit":
                    this.globalVar.user[data.masterType][data.edit.id] = data.edit;
                    break;
                case "switch":
                    if(Object.keys(this.globalVar.user[data.masterType]).length > 0){
                        this.globalVar.user[data.masterType][data.switch.device.Raum].roomdevices[data.switch.device.deviceid].status = data.switch.status;
                    }
                    for(var i = 0; i < this.globalVar.user.favoritDevices.length; i++){
                        if(this.globalVar.user.favoritDevices[i].deviceid == data.switch.device.deviceid){
                            this.globalVar.user.favoritDevices[i].status = parseFloat(data.switch.status);
                        }
                    }
                    break;
                case "push":
                    this.globalVar.user[data.masterType].push(data.push);
                    break;
                default:
                    console.log(data.masterType);
                    console.log(data.type);
                    break;
            }
            // this.loaded.push(data.masterType);
            // if(data.masterType === "favoritDevices"){
            // this.loading = false;
            // }
        });
        this.socket.disconnect(data => {
            console.log("Verbindung zum Server verloren");
            this.loading = true;
        });
        this.socket.connect(data => {
            console.log("Verbindung zum Server hergestellt");
            this.loading = false;
        });
    }
    ngOnDestroy(){
      this.connection.unsubscribe();
    }
    /*onKey(event: Event){
        console.log(event);
    }*/
}