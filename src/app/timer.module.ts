// import { RouterModule }             from "@angular/router";
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgModule, Component, Pipe, PipeTransform }      from '@angular/core';
// import { CommonModule }             from "@angular/common";
// import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";

// import { GlobalObjectsService }     from "./app.service.global";
// import { SocketService }            from './app.service';

// import { TimersComponent }          from './timers/timers.component';
// import { TimerShowComponent }       from './timer-show/timer-show.component';
// import { TimerHeaderComponent }     from "./timer-header/timer-header.component";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// @Pipe({ name: 'ObjNgFor',  pure: false })
// export class ObjNgFor implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//       if(value){
//         return Object.keys(value).map(key => value[key]);
//       }
//     }
// }

// @NgModule({
//     declarations: [
//          TimersComponent
//         ,TimerShowComponent
//         ,TimerHeaderComponent
//         ,ObjNgFor
//     ],
//     imports: [
//         CommonModule,
//         FormsModule,
//         ReactiveFormsModule,
//         NgbModule,
//         RouterModule.forChild([
//             {
//                 path: '',
//                 component: TimersComponent
//             }
//         ])
//     ],
//     exports: [
//         TimersComponent
//         //,TimerShowComponent
//         //,TimerHeaderComponent
//     ],
//     providers: [
//         SocketService
//         ,GlobalObjectsService
//     ],
//     bootstrap: [
//         TimersComponent
//     ]
// })
// export default class TimerModule {}
