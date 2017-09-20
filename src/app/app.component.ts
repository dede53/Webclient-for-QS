import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './app.service';
import { GlobalObjectsService } from "./app.service.global";

import { TimerEditComponent } from "./timer-edit/timer-edit.component";

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
        if(this.globalVar.activeUser.id != this.users[this.selectedUser].id){
            if(this.globalVar.activeUser.name != ""){
                this.globalVar.user.chartOptions.series = [];
                this.globalVar.user.alerts = {};
                console.log("leave:" + this.globalVar.activeUser.name);
                this.socket.emit('room:leave', this.globalVar.activeUser.name);
            }
            this.setCookie("qs-user", this.selectedUser, 365);
            console.log("join:" + this.users[this.selectedUser].name);
            this.socket.emit('room:join', this.users[this.selectedUser]);
            // this.globalVar.user.chartOptions.showLoading();
            this.globalVar.user.hideChart = true;
            if(this.globalVar.user.chart){
                this.globalVar.user.chart.showLoading();
            }
            this.socket.emit('variables:chart', {user: this.users[this.selectedUser].id, hours: this.users[this.selectedUser].chartHour});
            this.globalVar.activeUser = this.users[this.selectedUser];
        }
    }
  
    // loaded = [];
    selectedUser: number = 0;
    connection;
    messages = [];
    users;
    devicelist;
    showFav:boolean = true;
    moreMessagesAvailable = true;

    toogleFav(status){
        console.log(status);
        this.showFav = !status;
        let that = this;

        setTimeout(function(){
            that.globalVar.user.chart.reflow();
        }, 100);
    }

    ngOnInit(){
        this.socket.emit('users:get', "");
        this.socket.on('users', data => {
            this.users = data[data.type];
            this.loading = false;
            var cookie = this.getCookie('qs-user');
            if(cookie != ""){
                this.selectedUser = parseInt(cookie) || 0;
                this.setUser();
            }else{
                console.log("No cookie!!");
            }
        });
        this.socket.on('all', data => {
            console.log(data);
            switch(data.type){
                case "get":
                    this.globalVar.user[data.masterType] = data.get;
                    break;
                case "add":
                    console.log(this.globalVar.user[data.masterType]);
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
                case "unshift":                
                    this.globalVar.user[data.masterType].unshift(data.unshift);
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
            console.log(this.globalVar.activeUser);
            if(this.globalVar.activeUser.name != ""){
                this.socket.emit('room:join', this.globalVar.activeUser);
            }
            console.log("Verbindung zum Server hergestellt");
            this.loading = false;
        });
        let chartOptions = {
            chart: {
                backgroundColor: '#ffffff',
                zoomType:"x",
                resetZoomButton: {
                    theme:{
                        display: "none"
                    }
                    // relativeTo:"plot"
                }
            },
            navigator: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            // rangeSelector: {
            //     enabled: false,
            //     buttons: [{
            //         type: 'hour',
            //         count: 12,
            //         text: '12h'
            //     }, {
            //         type: 'day',
            //         count: 1,
            //         text: '1d'
            //     }, {
            //         type: 'day',
            //         count: 2,
            //         text: '2d'
            //     },{
            //         type: 'week',
            //         count: 1,
            //         text: '1w'
            //     },{
            //         type: 'all',
            //         text: 'All'
            //     }],
            //     inputEnabled: false, // it supports only days
            //     selected: 4 // all
            // },
            plotOptions: {
                series: {
                    marker:{
                        enabled: false
                    },
                    animation: false
                }
            },
            xAxis: [{
                type: 'datetime',
                labels:{
                    rotation: 0,
                    style: {
                        "color": '#80a3ca',
                        "fontSize": "16px"
                    }
                },
                events: {
                    afterSetExtremes: function(e){
                        console.log(Math.round(e.min));
                        console.log(Math.round(e.max));
                        
                    }
                },
                dateTimeLabelFormats: {
                    second: '%d.%m<br/>%H:%M:%S',
                    minute: '%d.%m<br/>%H:%M',
                    hour: '%d.%m<br/>%H:%M',
                    day: '%d.%m<br/>%H:%M',
                    week: '%d.%m.%Y',
                    month: '%m.%Y',
                    year: '%Y'
                }
            }],
            series: [],
            yAxis: [{
                allowDecimals: true,
                opposite: true,
                title: {
                    text: 'Temperatur',
                    style: {
                        "color": '#80a3ca',
                        "fontSize": "16px"
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        "color": '#80a3ca',
                        "fontSize": "16px"
                    }
                },
                plotLines: [/*{
                    value: 5,
                    color: '#444488',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: '5°C'
                    }
                }*/]
            }],

            legend: {
                enabled: true,
                itemStyle: {
                    "fontSize": "16px"
                }
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            }
        };
        
        this.socket.on("varChart", data => {
            if(data.get.length > 0){
                this.globalVar.user.chartOptions = chartOptions;
                this.globalVar.user.hideChart = false;
                this.globalVar.user.chartOptions.series = data.get;
                if(this.globalVar.user.chart){
                    this.globalVar.user.chart.update(this.globalVar.user.chartOptions);
                    this.globalVar.user.chart.hideLoading();
                }
            }
        });

        this.socket.emit("messages:loadOld", new Date().getTime());
        /*     this.socket.on('chatMessages', data => {
            this.messages.splice(0, 0, data[data.type]);
        }) */
        this.socket.on('moreMessagesAvailable', data => {
            this.moreMessagesAvailable = data;
        });
    }
    ngOnDestroy(){
      this.connection.unsubscribe();
    }
    /*onKey(event: Event){
        console.log(event);
    }*/
}