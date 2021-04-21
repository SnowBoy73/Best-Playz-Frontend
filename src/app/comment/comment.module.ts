import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule
  ]
})
export class CommentModule { }
