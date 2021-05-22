import { Injectable } from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {WelcomeDto} from '../shared/welcome.dto';
import {ClientModel} from '../shared/client.model';
import {CommentModel} from '../shared/comment.model';
import {GetClients} from './comment.actions';

export interface CommentStateModel {
  clients: ClientModel[];
  client: ClientModel | undefined;
  comments: CommentModel[];
}

@State<any>({
  name: 'comment',
  defaults: {
    clients: [],
    client: undefined,
    comments: []
  }
})
@Injectable()
export class CommentState {
  @Action(GetClients)
  getClients(ctx: StateContext<CommentStateModel>) {
    const state = ctx.getState();
    const newState: CommentStateModel = {
      ...state,
      clients: [{id: '2', nickname: 'test'}]
    };
    ctx.setState(newState);
  }
}
