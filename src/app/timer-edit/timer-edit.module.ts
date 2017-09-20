import { RouterModule }             from "@angular/router";
import { FormsModule,
         ReactiveFormsModule }      from '@angular/forms';
import { NgModule
         , Component
         , Pipe
         , PipeTransform }          from '@angular/core';
import { CommonModule }             from "@angular/common";
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";

import { GlobalObjectsService }     from "../app.service.global";
import { SocketService }            from '../app.service';

import { TimerEditComponent
         ,TimerGroupComponent
         ,TimerDeviceComponent
         ,TimerAlertComponent
         ,TimerRoomComponent
        //  ,TimerConditionVariableComponent
       }                            from './timer-edit.component';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';

@Pipe({ name: 'ObjNgFor',  pure: false })
export class ObjNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
      if(value){
        return Object.keys(value).map(key => value[key]);
      }
    }
}

@NgModule({
    declarations: [
         TimerEditComponent
        ,ObjNgFor
        ,TimerGroupComponent
        ,TimerDeviceComponent
        ,TimerAlertComponent
        ,TimerRoomComponent
        // ,TimerConditionVariableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: TimerEditComponent
            },{
                path: '',
                component: TimerEditComponent
            }
        ])
    ],
    exports: [
         TimerEditComponent
        ,ObjNgFor
        ,TimerGroupComponent
        ,TimerDeviceComponent
        ,TimerAlertComponent
        ,TimerRoomComponent
    ],
    providers: [
        SocketService
        ,GlobalObjectsService
    ],
    bootstrap: [
        TimerEditComponent
    ]
})
export class TimerEditModule {}
