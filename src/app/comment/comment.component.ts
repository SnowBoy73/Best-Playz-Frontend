import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommentService} from './shared/comment.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {CommentClient} from './shared/comment.client';
import { Comment } from './shared/comment';
import {loginDto} from './shared/login.dto';
import {StorageService} from '../shared/storage.service';
import {CommentDto} from './shared/comment.dto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  loggedInUser: CommentClient | undefined;

  commentFC = new FormControl('');
  comments: Comment[] = [];
  unsubscribe$ = new Subject();
  loginFC = new FormControl('');
  clients$: Observable<CommentClient[]> | undefined;
  client: CommentClient | undefined;
  error$: Observable<string> | undefined; // move to app.component for global errors
  socketId: string | undefined;

  constructor(private commentService: CommentService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.clients$ = this.commentService.listenForClients();
    this.error$ = this.commentService.listenForErrors(); // move to app.component for global errors
    this.commentService.listenForComments()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(comment => {
        console.log('comment listened');
        this.comments.push(comment);
      });
    this.commentService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.comments = welcome.comments;
        this.client = welcome.client;
        this.storageService.saveCommentClient(this.client);
      });
    const oldClient = this.storageService.loadCommentClient();
    if (oldClient) {
      this.commentService.sendLogin({
        id: oldClient.id,
        nickname: oldClient.nickname
      });
    }
    this.commentService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        // console.log('connect id', id);
        this.socketId = id;
      });
    this.commentService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        // console.log('disconnect id', id);
        this.socketId = id;
      });
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    // this.commentService.disconnect();  // Removed to stay connected between highscores
  }

  postComment(): void {
    console.log('dto nickname: ', this.storageService.loadCommentClient()?.nickname);
    // loggedInUser = this.storageService.loadCommentClient();
    if (this.storageService.loadCommentClient()?.nickname) {
      if (this.commentFC.value) {
        const commentDto: CommentDto = {
          highscoreId: '1',  // MOCK !!!
          text: this.commentFC.value,
          sender: this.storageService.loadCommentClient()?.nickname,
        };
        this.commentService.postComment(commentDto);
        this.commentFC.patchValue('');
      }
    }
  }

  login(): void {
    if (this.loginFC.value) {
      const dto: loginDto = {nickname: this.loginFC.value};
      this.commentService.sendLogin(dto);
    }
  }
}
