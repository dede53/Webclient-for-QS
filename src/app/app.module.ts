import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerBasic } from './datepicker/datepicker.component';
import { NgbdModalBasic } from './modal/modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';


import { AppComponent } from './app.component';
import { SocketService } from './app.service';
import { ChatComponent } from './chat/chat.component';
import { ActiveDevicesComponent } from './active-devices/active-devices.component';
import { FavoritDevicesComponent } from './favorit-devices/favorit-devices.component';
import { DevicesComponent, ObjNgFor, isEmpty } from './devices/devices.component';
import { SwitchButtonComponent, ShutterComponent } from "./device/device.component";
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { GlobalObjectsService } from "./app.service.global";
import { CountdownsComponent } from './countdowns/countdowns.component';
import { TimersComponent } from './timers/timers.component';
import { TimerHeaderComponent } from './timer-header/timer-header.component';
import { TimerShowComponent } from './timer-show/timer-show.component';

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
    ,HomeComponent
    ,DevicesComponent
    ,ObjNgFor
    ,isEmpty
    ,GroupsComponent
    ,CountdownsComponent
    ,TimersComponent
    ,TimerHeaderComponent
    ,TimerShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule,
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
        loadChildren: "./timer-edit/timer-edit.module"
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
    ,GlobalObjectsService
    //,TimerFunctionsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
