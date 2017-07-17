import {Injectable} from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

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
        variables: {}
    };
    activeUser = {
        name:"",
        groups:{},
        id:""
    };
    constructor() {}  
}