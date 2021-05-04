import { CommentClient} from './comment.client';
import { CommentModel} from './comment.model';

export interface WelcomeDto {
  clients: CommentClient[];
  client: CommentClient;
  comments: CommentModel[];
}
