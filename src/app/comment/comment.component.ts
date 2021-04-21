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
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  postComment(): void {
    console.log(this.commentFC.value);
    this.commentService.postComment(this.commentFC.value);
  }
}
