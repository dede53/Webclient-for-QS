import { Component, OnInit }                from '@angular/core';
import { GlobalObjectsService } from "../app.service.global";
import { SocketService } from "../app.service";
import { ChartModule }              from 'angular2-highcharts';

@Component({
  selector: 'app-chart',
    styleUrls: ['./chart.component.css'],
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit{

    constructor(public globalVar: GlobalObjectsService, private socket: SocketService, private chartModule: ChartModule) {}
    hours:number = 192;
    saveInstance(chartInstance) {
        this.globalVar.user.chart = chartInstance;
    }
    getTempHistory(hours){
		this.globalVar.activeUser.chartHour = hours;
        this.socket.emit('variables:chart', {user: this.globalVar.activeUser.id, hours: hours});
        this.globalVar.user.chart.showLoading();
    }
    ngOnInit(){}
}