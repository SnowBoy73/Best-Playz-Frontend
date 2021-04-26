import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CommentClient} from './comment.client';
import {Comment} from './comment';
import {WelcomeDto} from './welcome.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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
