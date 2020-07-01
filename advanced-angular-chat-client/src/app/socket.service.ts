import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
// import {Socket} from 'ng-socket-io';
// import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  emitMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  receiveMessage() {
    // return this.socket
    //   .fromEvent('message')
    //   .pipe(map((data) => data.msg));
  }

  constructor(private socket: Socket) {
    // this.socket = io('/socket.io');
    // console.log(this.socket);
    // this.socket.connect();
    // this.emitMessage('test1');
    try {
      this.socket.emit('message', {data: 'string'});
      this.socket.emit('ping', {ping: 'ping'});
      this.socket.emit('json', {data: 'json'});
    } catch (e) {
      console.log(e);
    }


  }


}
