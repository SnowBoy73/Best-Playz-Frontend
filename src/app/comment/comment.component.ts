import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommentService} from './shared/comment.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ClientModel} from './shared/client.model';
import { CommentModel } from './shared/comment.model';
import {loginDto} from './shared/login.dto';
import {StorageService} from '../shared/storage.service';
import {CommentDto} from './shared/comment.dto';
import {HighscoreModel} from '../leaderboard/shared/highscore.model';
import {HighscoreDto} from '../leaderboard/shared/highscore.dto';
import {CommentState} from './state/comment.state';
import {Select, Store} from '@ngxs/store';
import {ListenForClients, ListenForHighscoreComments, StopListeningForClients} from './state/comment.actions';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  commentFC = new FormControl('');
  comments: any[] = [];
  unsubscribe$ = new Subject();
  loginFC = new FormControl('');
  @Select(CommentState.clients)
  clients$: Observable<ClientModel[]> | undefined;
  client: ClientModel | undefined;
  error$: Observable<string> | undefined; // move to app.component for global errors
  socketId: string | undefined;
  selectedHighscore: HighscoreModel | undefined;
  isLoggedIn = localStorage.length;
  userNickname: string | undefined;


  constructor(private store: Store,
              private commentService: CommentService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    console.log('Comment Component Initialised');
    console.log('Logged in as: ', this.storageService.loadClient()?.nickname); //
    this.commentService.connect(); // MUY IMPORTANTÃ‰!!
    this.userNickname = this.storageService.loadClient()?.nickname;  // this.store.comment.client.nickname
    console.log('comment userNickname: ', this.storageService.loadClient()?.nickname);
    this.selectedHighscore = history.state.data as HighscoreModel; // angular rooter state.
    console.log('selectedHighscore!! = ', this.selectedHighscore);

    this.commentService.requestHighscoreComments(this.selectedHighscore);
  /*  this.commentService.listenForHighscoreComments()  // web side version
      .pipe(
        take(1)
      )
      .subscribe(comments => {
        console.log(comments);
        console.log(comments.length, ' comments received');
        this.comments = comments;
      });*/
    this.error$ = this.commentService.listenForErrors(); // move to app.component for global errors
    // new State MGMT bit
    // this.clients$ = this.commentService.listenForClients(); //


    this.store.dispatch(new ListenForClients()); // NEW and EXPERIMENTAL - seems to work!!
    this.store.dispatch(new ListenForHighscoreComments()); // NEW and EXPERIMENTAL - seems to work!!
    // get the stated. ---- this.comments = comments; old version


    this.commentService.listenForNewComment()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(comment => {
        console.log('comment received');
        if (this.selectedHighscore) {
          console.log( 'New comment = ', comment);
          console.log( 'selectedHighscore  = ', this.selectedHighscore);

          if (comment.highscoreId === this.selectedHighscore.id) {
            console.log( 'equal  = true');

            this.comments.push(comment);
          }
        }

      });

    this.commentService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('connect id', id); //
        this.socketId = id;
      });
    this.commentService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('disconnect id', id); //
        this.socketId = id;
      });
  }

  ngOnDestroy(): void {
    console.log('CommentModel Component Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.commentService.disconnect();  // Removed to stay connected between routes
    this.store.dispatch(new StopListeningForClients());
  }

  postComment(): void {
    console.log('dto nickname: ', this.storageService.loadClient()?.nickname);
    if (this.storageService.loadClient()?.nickname) {
      if (this.commentFC.value) {
        if (this.selectedHighscore) {

         // this.store.dispatch(new ListenForClients()); // NEW and EXPERIMENTAL

          const commentDto: CommentDto = {
            highscoreId: this.selectedHighscore?.id,
            text: this.commentFC.value,
            sender: this.storageService.loadClient()?.nickname,
          };
          console.log('highscoreId:', commentDto.highscoreId);

          this.commentService.postComment(commentDto);
          this.commentFC.patchValue('');
        }
      }
    }
  }

}

