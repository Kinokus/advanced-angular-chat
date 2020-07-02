import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
// import {Socket} from 'ng-socket-io';
// import * as io from 'socket.io-client';
// const io = require('socket.io')(http);
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  private initSocket(): void {
    this.socket = socketIo('/socket.io');
    console.log(this.socket);
    const tempRes = this.socket.emit('message', {empty: true});
    console.log(tempRes);

  }

  emitMessage(msg: string) {
    // this.socket.emit('message', msg);
  }

  receiveMessage() {
    // return this.socket
    //   .fromEvent('message')
    //   .pipe(map((data) => data.msg));
  }

  constructor(
    // private socket: Socket
  ) {
    this.initSocket();
    // const socket = io();
    // socket.on('connect', () => {
    //   socket.emit('my event', {data: 'I\'m connected!'});
    // });
    // this.socket = io('/socket.io');
    // console.log(this.socket);
    // this.socket.connect();
    // this.emitMessage('test1');
    try {
      // this.socket.emit('message', {data: 'string'});
      // this.socket.emit('ping', {ping: 'ping'});
      // this.socket.emit('json', {data: 'json'});
    } catch (e) {
      console.log(e);
    }


  }


}
