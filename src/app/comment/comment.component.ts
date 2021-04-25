import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommentService} from './shared/comment.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ClientCommentDto} from './shared/client-comment.dto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  commentFC = new FormControl('');
  comments: string[] = [];
  unsubscribe$ = new Subject();
  loginFC = new FormControl('');
  nickname: string |undefined;
  clients$: Observable<ClientCommentDto[]> | undefined;
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.clients$ = this.commentService.listenForClients();
    this.commentService.listenForComments()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(comment => {
        console.log('comment listened');
        this.comments.push(comment);
      });
    this.commentService.getAllComments()
      .pipe(
        take(1)
      )
      .subscribe(comments => {
        console.log('comments subscribed');
        this.comments = comments;
      });
    this.commentService.connent();  // maybe not for leaderboard
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.commentService.disconnent();  // maybe not for leaderboard

  }

  postComment(): void {
    console.log(this.commentFC.value);
    this.commentService.postComment(this.commentFC.value);
  }

  login(): void {
    if (this.loginFC.value) {
    this.nickname = this.loginFC.value;
    }
    this.commentService.sendLogin(this.loginFC.value);
  }
}
