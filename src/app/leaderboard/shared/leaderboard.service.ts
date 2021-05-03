import { Injectable } from '@angular/core';
import {CommentDto} from '../../comment/shared/comment.dto';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Comment} from '../../comment/shared/comment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private socket: Socket) { }

  postHighScore(highscore: string): void {
    console.log('highscore = ', highscore);
    this.socket.emit('highscore', highscore);
  }

  listenForHighscores(): Observable<string> {
    return this.socket
      .fromEvent<string>('newHighscore');
  }

  getAllHighscores(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('allHighscores');
  }

  disconnect(): void{
    this.socket.disconnect();
  }

  connect(): void{
    this.socket.connect();
  }
}
