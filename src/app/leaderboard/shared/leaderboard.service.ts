import { Injectable } from '@angular/core';
import {CommentDto} from '../../comment/shared/comment.dto';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private socket: Socket) { }

  postHighScore(highscore: string): void {
    console.log('highscore = ', highscore);
    this.socket.emit('highscore', highscore);
  }
}
