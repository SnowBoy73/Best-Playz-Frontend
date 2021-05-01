import { Injectable } from '@angular/core';
import {CommentClient} from '../comment/shared/comment.client';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
    saveCommentClient(commentClient: CommentClient): void {
      localStorage.setItem('client', JSON.stringify(commentClient));
  }

  loadCommentClient(): CommentClient | undefined {
    const commentClientString = localStorage.getItem('client');
    if (commentClientString) {
      const commentClient: CommentClient = JSON.parse(commentClientString);
      return commentClient;
    }
    return undefined;
  }
}
