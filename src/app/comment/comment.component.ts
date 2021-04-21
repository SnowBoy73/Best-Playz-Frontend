import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommentService} from './shared/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentFC = new FormControl('');
  comments: string[] = [];
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentService.listenForComments()
      .subscribe(comment => {
        this.comments.push(comment);
      });
  }

  postComment(): void {
    console.log(this.commentFC.value);
    this.commentService.postComment(this.commentFC.value);
  }
}
