import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ClientModel} from '../shared/client.model';
import {CommentModel} from '../shared/comment.model';
import {
  ListenForClients,
  ListenForHighscoreComments,
  StopListeningForClients,
  UpdateClients,
  UpdateHighscoreComments
} from './comment.actions';
import {CommentService} from '../shared/comment.service';
import {Subscription} from 'rxjs';

export interface CommentStateModel {
  clients: ClientModel[];
  client: ClientModel | undefined;
  comments: CommentModel[];
}

@State<CommentStateModel>({
  name: 'comment',
  defaults: {
    clients: [],
    client: undefined,
    comments: []
  }
})
@Injectable()
export class CommentState {
  private clientsUnsub: Subscription | undefined;
  constructor(private commentService: CommentService) {}

  @Selector()
  static clients(state: CommentStateModel): ClientModel[] {
    return state.clients;
  }

  @Selector()
  static comments(state: CommentStateModel): CommentModel[] {
    return state.comments;
  }

  @Action(ListenForClients)
  getClients(ctx: StateContext<CommentStateModel>): void {
    this.clientsUnsub = this.commentService.listenForClients()
      .subscribe(clients => {
        ctx.dispatch(new UpdateClients(clients));
      });
  }

  @Action(StopListeningForClients)
  stopListeningForClients(ctx: StateContext<CommentStateModel>): void {
    if (this.clientsUnsub) {
      this.clientsUnsub.unsubscribe();
    }
  }

  @Action(UpdateClients)
  updateClients(ctx: StateContext<CommentStateModel>, uc: UpdateClients): void {
    this.commentService.listenForClients()
      .subscribe(clients => {
        const state = ctx.getState();
        // const oldClients = [...state.clients];
        // oldClients.push({id: '2', nickname: 'test'});
        const newState: CommentStateModel = {
          ...state,
          clients: uc.clients
        };
        ctx.setState(newState);
      });
  }

  @Action(ListenForHighscoreComments)
    getHighcoreComments(ctx: StateContext<CommentStateModel>): void {
      this.commentService.listenForHighscoreComments()
        .subscribe(comments => {
          ctx.dispatch(new UpdateHighscoreComments(comments));
        });
  }

  @Action(UpdateHighscoreComments)
    updateHighcoreComments(ctx: StateContext<CommentStateModel>, uhc: UpdateHighscoreComments): void {
      this.commentService.listenForHighscoreComments()
        .subscribe(comments => {
          const state = ctx.getState();
          const newState: CommentStateModel = {
            ...state,
            comments: uhc.comments
          };
          ctx.setState(newState);
        });
  }

}
