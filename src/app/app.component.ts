import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {CommentService} from './comment/shared/comment.service';
import {StorageService} from './shared/storage.service';
import {CommentComponent} from './comment/comment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Best-Playz-Frontend';
  isLoggedIn = localStorage.length;
  constructor(// private commentComponent: CommentComponent,  // NOT COOL but whatever - if it works
              private storageService: StorageService) { }

  /* Can put global error listening here (from comment service)!!
  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }

   */

  logout(): void {
    localStorage.clear();
   /* let clientId: string = '** undefined **';
    if (this.storageService.loadClient() !== undefined) {
      let cl: string = this.commentComponent.getClientId();
      if (cl !== undefined) {
        clientId = cl as string;
      }
      this.storageService.deleteClient(cl);
    } */
  }
}
