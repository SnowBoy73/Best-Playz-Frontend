import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommentService} from './shared/comment.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {CommentClient} from './shared/comment.client';
import { Comment } from './shared/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  commentFC = new FormControl('');
  comments: Comment[] = [];
  unsubscribe$ = new Subject();
  loginFC = new FormControl('');
  clients$: Observable<CommentClient[]> | undefined;
  client: CommentClient | undefined;
  error$: Observable<string> | undefined; // move to app.component for global errors
  socketId: string | undefined;

  constructor(private commentService: CommentService) { }

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
        this.client = this.commentService.client = welcome.client;
      });
    if (this.commentService.client) {
      this.commentService.sendLogin(this.commentService.client.nickname);
    }
    // this.commentService.connent();  // Removed to stop reconnecting between highscores
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
    // this.commentService.disconnent();  // Removed to stay connected between highscores
  }

  postComment(): void {
    console.log(this.commentFC.value);
    this.commentService.postComment(this.commentFC.value);
    this.commentFC.patchValue('');
  }

  login(): void {
    if (this.loginFC.value) {
      // this.nickname = this.loginFC.value;
      this.commentService.sendLogin(this.loginFC.value);
    }
  }
}
