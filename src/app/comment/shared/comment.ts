import { CommentClient } from './comment.client';

export interface Comment {
  id: string;
  highscoreId: string;  // highscoreClient??
  text: string;
  sender: string;
  posted: string;
}
