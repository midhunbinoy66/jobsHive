import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket!:Socket

  constructor() { }

  connectSocket(id:string):void{
    this.socket =io(environment.baseUrl,{query:{id}});
  }

  listent(eventName:string):Observable<any>{
    return new Observable((subscribe)=>{
      this.socket.on(eventName,(data)=>{
        subscribe.next(data);
      })
    })
  }

  emit(eventName:string,data:any):void{
    this.socket.emit(eventName,data);
  }

  disconnectSocket():void{
    this.socket.disconnect();
  }
}

