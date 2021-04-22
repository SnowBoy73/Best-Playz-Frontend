import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommentService} from './shared/comment.service';
import {Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  commentFC = new FormControl('');
  comments: string[] = [];
  unsubscribe$ = new Subject();
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
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
        console.log('cooments subscribed');
        this.comments = comments;
      });
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  postComment(): void {
    console.log(this.commentFC.value);
    this.commentService.postComment(this.commentFC.value);
  }
}
