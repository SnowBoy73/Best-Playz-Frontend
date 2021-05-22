import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {NgxsModule} from '@ngxs/store';
import {CommentState} from './state/comment.state';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forFeature([CommentState])
  ]
})
export class CommentModule { }
