import { CommentClient} from './comment.client';
import { Comment} from './comment';

export interface WelcomeDto {
  clients: CommentClient[];
  client: CommentClient;
  comments: Comment[];
}
