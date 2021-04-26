import { CommentClient } from './comment.client';

export interface Comment {
  highscoreId: string;  // highscoreClient??
  text: string;
  sender: CommentClient;
  posted: string;
}
