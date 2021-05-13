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
  clients$: Observable<ClientModel[]> | undefined;
  client: ClientModel | undefined;
  error$: Observable<string> | undefined; // move to app.component for global errors
  socketId: string | undefined;
  // selectedHighscore: Observable<HighscoreDto> | undefined;
  selectedHighscore: HighscoreDto[] = [];

  isLoggedIn = localStorage.length;
  userNickname: string | undefined;
  loggedInUser: ClientModel | undefined;
  // sub: Subscription = new Subscription();


  constructor(private commentService: CommentService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    console.log('Comment Component Initialised');
    console.log('Logged in as: ', this.storageService.loadClient()?.nickname); //
    this.commentService.connect(); // MUY IMPORTANTÉ!!
    this.userNickname = this.storageService.loadClient()?.nickname;
    console.log('comment userNickname: ', this.storageService.loadClient()?.nickname);
    const selectedHighscore: HighscoreModel = history.state.data as HighscoreModel;
    console.log('selectedHighscore!! = ', selectedHighscore);

    this.commentService.requestHighscoreComments(selectedHighscore);
    this.commentService.listenForHighscoreComments()
      .pipe(
        take(1)
      )
      .subscribe(comments => {
        console.log(comments);
        console.log(comments.length, ' comments received');
        this.comments = comments;
      });
    this.error$ = this.commentService.listenForErrors(); // move to app.component for global errors
    this.clients$ = this.commentService.listenForClients(); //
    this.commentService.listenForNewComment()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(comment => {
        console.log('comment received');
        this.comments.push(comment);
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
  }

  postComment(): void {
    console.log('dto nickname: ', this.storageService.loadClient()?.nickname);
    // loggedInUser = this.storageService.loadCommentClient();
    if (this.storageService.loadClient()?.nickname) {
      if (this.commentFC.value) {
        const commentDto: CommentDto = {
          highscoreId: '1',  // MOCK !!!
          text: this.commentFC.value,
          sender: this.storageService.loadClient()?.nickname,
        };
        this.commentService.postComment(commentDto);
        this.commentFC.patchValue('');
      }
    }
  }

}

