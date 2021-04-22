import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private socket: Socket ) { }

  postComment(msg: string): void {
    this.socket.emit('comment', msg);
  }

  listenForComments(): Observable<string> {
    return this.socket
      .fromEvent<string>('newComment');
  }

  getAllComments(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('allComments');
  }

  sendLogin(nickname: string): void {
    console.log(nickname);
    this.socket.emit('login', nickname);
  }

  disconnent(): void{
    this.socket.disconnect();
  }

  connent(): void{
    this.socket.connect();
  }
}
