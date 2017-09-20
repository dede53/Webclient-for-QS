import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerBasic } from './datepicker/datepicker.component';
import { NgbdModalBasic } from './modal/modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { ChartModule }              from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

// import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require: any;
export function highchartsFactory() {
    var Highcharts = require('highcharts/highstock');
    Highcharts.setOptions({
		global : {
			useUTC : false
		},
        lang:{
            loading:"Versuche Daten zu laden..."
        }
    });
    return Highcharts;
}



import { AppComponent } from './app.component';
import { SocketService } from './app.service';
import { ChatComponent } from './chat/chat.component';
import { ActiveDevicesComponent } from './active-devices/active-devices.component';
import { FavoritDevicesComponent } from './favorit-devices/favorit-devices.component';
import { DevicesComponent, ObjNgFor, isEmpty } from './devices/devices.component';
import { SwitchButtonComponent, ShutterComponent, DimmerComponent } from "./device/device.component";
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { GlobalObjectsService } from "./app.service.global";
import { CountdownsComponent } from './countdowns/countdowns.component';
import { TimersComponent } from './timers/timers.component';
import { TimerHeaderComponent } from './timer-header/timer-header.component';
import { TimerShowComponent } from './timer-show/timer-show.component';
import { AlertsComponent } from "./alerts/alerts.component";
import { ChartComponent } from './chart/chart.component';

import { TimerEditModule } from "./timer-edit/timer-edit.module";
import { VariablesComponent } from './variables/variables.component';

declare var require: any;
/*
    export function highchartsFactory() {
      const hc = require('highcharts');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
    }
*/

@NgModule({
  declarations: [
    AppComponent
    ,ChatComponent
    ,NgbdDatepickerBasic
    ,NgbdModalBasic
    ,ActiveDevicesComponent
    ,FavoritDevicesComponent
    ,DevicesComponent
    ,SwitchButtonComponent
    ,ShutterComponent
    ,DimmerComponent
    ,HomeComponent
    ,DevicesComponent
    ,ObjNgFor
    ,isEmpty
    ,GroupsComponent
    ,CountdownsComponent
    ,TimersComponent
    ,TimerHeaderComponent
    ,TimerShowComponent
    ,AlertsComponent, ChartComponent, VariablesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule,
    ChartModule,
    // , require('highcharts/modules/exporting') 
    // ChartModule.forRoot(require('highcharts')),
    // ChartModule.forRoot(Test124),
    RouterModule.forRoot([
    //   {
    //     path: 'chat',
    //     component: ChatComponent
    //   },
    //   {
    //     path: 'modal',
    //     component: NgbdModalBasic
    //   },
    //   {
    //     path: 'date',
    //     component: NgbdDatepickerBasic
    //   },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'devices',
        component: DevicesComponent
      },
      {
        path: 'timers',
        component: TimersComponent
      },
      {
        path: 'editTimer',
        loadChildren: "./timer-edit/timer-edit.module#TimerEditModule"
      },
      {
        path: 'chart',
        component: ChartComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ],{
      useHash: true
    })
  ],
  providers: [
    SocketService
    ,GlobalObjectsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
    //,TimerFunctionsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
