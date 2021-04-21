import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private socket: Socket ) { }

  postComment(msg: string): void {
    this.socket.emit('comment', msg);
  }
}
