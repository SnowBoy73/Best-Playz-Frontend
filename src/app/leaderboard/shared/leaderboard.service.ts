import { Injectable } from '@angular/core';
import {CommentDto} from '../../comment/shared/comment.dto';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CommentModel} from '../../comment/shared/comment.model';
import {HighscoreModel} from './highscore.model';
import {HighscoreDto} from './highscore.dto';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private socket: Socket) { }

  postHighScore(highscoreDto: HighscoreDto): void {
    console.log('highscore = ', highscoreDto);
    this.socket.emit('highscore', highscoreDto);
  }

  listenForHighscores(): Observable<HighscoreModel> {
    return this.socket
      .fromEvent<HighscoreModel>('newHighscore');
  }

  getAllHighscores(): Observable<HighscoreModel[]> {
    return this.socket
      .fromEvent<HighscoreModel[]>('allHighscores');
  }

  disconnect(): void{
    this.socket.disconnect();
  }

  connect(): void{
    this.socket.connect();
  }
}
