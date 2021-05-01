import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CommentClient} from './comment.client';
import {Comment} from './comment';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  client: CommentClient | undefined;

  constructor(private socket: Socket ) { }

  postComment(comment: string): void {
    this.socket.emit('comment', comment);
  }

  listenForComments(): Observable<Comment> {
    return this.socket
      .fromEvent<Comment>('newComment');
  }

  listenForClients(): Observable<CommentClient[]> {
    return this.socket
      .fromEvent<CommentClient[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDto> {
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }

  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  getAllComments(): Observable<Comment[]> {
    return this.socket
      .fromEvent<Comment[]>('allComments');
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
