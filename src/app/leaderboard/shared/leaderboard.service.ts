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
    console.log('highscore posted = ', highscoreDto);
    this.socket.emit('postHighscore', highscoreDto);
  }

  listenForNewHighscore(): Observable<HighscoreModel> {
    return this.socket
      .fromEvent<HighscoreModel>('newHighscore');
  }

  requestGameHighscores(gameId: number): void {
    console.log('requestGameHighScore called');
    this.socket.emit('requestGameHighscores', gameId);
  }

  sendSelectedHighscore(selectedHighscore: HighscoreModel): void {
    console.log('requestGameHighScore called');
    console.log('DTO: ', selectedHighscore.id, selectedHighscore.nickname, selectedHighscore.gameId, selectedHighscore.score, selectedHighscore.date, selectedHighscore.time);

    this.socket.emit('requestGameHighscores', selectedHighscore);
  }

  listenForGameHighscores(): Observable<HighscoreModel[]> {  // Dto??
    return this.socket
      .fromEvent<HighscoreModel[]>('gameHighscores');
  }

  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }

  disconnect(): void{
    this.socket.disconnect();
  }

  connect(): void{
    this.socket.connect();
  }
}
