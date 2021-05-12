import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {ClientModel} from './client.model';
import {CommentModel} from './comment.model';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';
import {loginDto} from './login.dto';
import {CommentDto} from './comment.dto';
import {HighscoreModel} from '../../leaderboard/shared/highscore.model';
import {HighscoreDto} from '../../leaderboard/shared/highscore.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private socket: Socket) { }

  postComment(commentDto: CommentDto): void {
    this.socket.emit('postComment', commentDto);
  }

  listenForNewComment(): Observable<CommentModel> {
    return this.socket
      .fromEvent<CommentModel>('newComment');
  }

  requestHighscoreComments(selectedHighscore: HighscoreDto): void {
    console.log('requestHighscoreComments called');
    // console.log('DTO: ', selectedHighscore.id, selectedHighscore.nickname, selectedHighscore.gameId, selectedHighscore.score, selectedHighscore.date, selectedHighscore.time);

    this.socket.emit('requestHighscoreComments', selectedHighscore);
  }

  listenForHighscoreComments(): Observable<CommentModel[]> {  // Dto??
    return this.socket
      .fromEvent<CommentModel[]>('highscoreComments');
  }
/*
  sendSelectedHighscore(selectedHighscore: HighscoreDto): void {
    console.log('sendSelectedHighscore called');
    console.log('DTO: ', selectedHighscore.id, selectedHighscore.nickname, selectedHighscore.gameId, selectedHighscore.score, selectedHighscore.date, selectedHighscore.time);
    this.socket.emit('requestHighscoreComments', selectedHighscore);
  }
*/
  listenForClients(): Observable<ClientModel[]> {
    return this.socket
      .fromEvent<ClientModel[]>('clients');
  }

  listenForCommentWelcome(): Observable<WelcomeDto> {
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

  sendLogin(dto: loginDto): void {
    console.log(dto.nickname);
    this.socket.emit('login', dto);
  }

  disconnect(): void{
    this.socket.disconnect();
  }

  connect(): void{
    this.socket.connect();
  }
}
