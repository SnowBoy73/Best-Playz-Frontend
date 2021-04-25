import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CommentClientModel} from './comment-client.model';
import {CommentModel} from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private socket: Socket ) { }

  postComment(comment: string): void {
    this.socket.emit('comment', comment);
  }

  listenForComments(): Observable<CommentModel> {
    return this.socket
      .fromEvent<CommentModel>('newComment');
  }

  listenForClients(): Observable<CommentClientModel[]> {
    return this.socket
      .fromEvent<CommentClientModel[]>('clients');
  }

  getAllComments(): Observable<CommentModel[]> {
    return this.socket
      .fromEvent<CommentModel[]>('allComments');
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
