import {ClientModel} from '../shared/client.model';
import {CommentModel} from '../shared/comment.model';

export class ListenForClients {
  static readonly type = '[Comment] Listen For Clients';
}

export class StopListeningForClients {
  static readonly type = '[Comment] Stop Listening For Clients';
}

export class UpdateClients {
  constructor(public clients: ClientModel[]) {}
  static readonly type = '[Comment] Update Clients';
}

export class ListenForHighscoreComments {
  static readonly type = '[Comment] Listen For Comments';
}

export class UpdateHighscoreComments {
  constructor(public comments: CommentModel[]) {}
  static readonly type = '[Comment] Update Comments';
}

