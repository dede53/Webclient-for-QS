import {Injectable} from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

function afterSetExtremes(e){
    console.log(e);
}

@Injectable()
export class GlobalObjectsService {
    user = {
        active: [],
        alerts: {},
        chatMessages: [],
        countdowns: {},
        devicelist: [],
        devices:{},
        favoritDevices: [],
        groups:{},
        id:"",
        moreMessagesAvailable: true,
        name:"",
        timers: {},
        users: [],
        variables: {},
        favoritVariables:{},
        hideChart: true,
        chartOptions: {
                chart: {
                    backgroundColor: 'transparent',
                    zoomType:"x"
                },
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
                            console.log(e);
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
            },
        chart: void{}
    };
    activeUser = {
        name:"",
        groups:{},
        id:"",
        chartHour:24,
        varChart:[],
        variables:[]
    };
    constructor() {}
}