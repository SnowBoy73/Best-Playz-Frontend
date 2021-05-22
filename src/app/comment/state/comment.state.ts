import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ClientModel} from '../shared/client.model';
import {CommentModel} from '../shared/comment.model';
import {GetClients} from './comment.actions';

export interface CommentStateModel {
  clients: ClientModel[];
  client: ClientModel | undefined;
  comments: CommentModel[];
}

@State<CommentStateModel>({
  name: 'comment',
  defaults: {
    clients: [{id: '42', nickname: 'Crazy Bob'}],
    client: undefined,
    comments: []
  }
})
@Injectable()
export class CommentState {
  @Selector()
  static clients(state: CommentStateModel): ClientModel[] {
    return state.clients;
  }
    @Action(GetClients)
  getClients(ctx: StateContext<CommentStateModel>): void {
    const state = ctx.getState();

    const oldClients = [...state.clients];
    oldClients.push({id: '2', nickname: 'test'});

    const newState: CommentStateModel = {
    ...state,
    clients: [...oldClients]
  };
    ctx.setState(newState);
  }
}
