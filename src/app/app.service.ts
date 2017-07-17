import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client'; 

export class ServerResponse {
  masterType: string;
  type: string;
}

export class SocketService {
    private url = 'http://192.168.2.47:1230';
    private socket = io(this.url);
    emit(type: string, message: any){
         this.socket.emit(type, message);
    }
    private observable = new Observable(observer => {
        this.socket.on('change', (data:ServerResponse) => {
            observer.next(data);
        });
        return () => {
            this.socket.disconnect();
        };
    })
    on(type: string, callback){
        this.observable.subscribe((data:ServerResponse) => {
            if(type === "all" || type === data.masterType){
                callback(data);
            }
        });
    }
    disconnect(callback){
        this.socket.on('disconnect', data => {
            callback(data);
        });
    }
    connect(callback){
        this.socket.on('connect', data=> {
            callback(data);
        });
    }
}