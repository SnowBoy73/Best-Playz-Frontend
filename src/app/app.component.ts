import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {CommentService} from './comment/shared/comment.service';
import {StorageService} from './shared/storage.service';
import {CommentComponent} from './comment/comment.component';
import {ClientModel} from './comment/shared/client.model';
import {FormControl} from '@angular/forms';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Best-Playz-Frontend';
  isLoggedIn = localStorage.length;
  userNickname: string | undefined;
  loggedInUser: ClientModel | undefined;
  loginRequest: boolean | undefined;
  loginFC = new FormControl('');

  constructor(
    private storageService: StorageService,
    private socket: Socket,
  ) { }

  /* Can put global error listening here (from comment service)!!
  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }

   */

  login(): void {

  }
/*
login(): void {
    // this.loginRequest = true;
    location.reload();

    /*if (this.loginFC.value) {
      const dto: loginDto = {nickname: this.loginFC.value};
      this.commentService.sendLogin(dto);
    }
}

sendLogin(dto: loginDto): void {
  // this.loginRequest = false;

  console.log(dto.nickname);
  this.socket.emit('login', dto);
}

 */
    logout(): void {
    console.log('Logout called in App Comp');
      // localStorage.clear();
    this.loggedInUser = this.storageService.loadClient();
    console.log('logout id :', this.storageService.loadClient()?.id);

    if (this.loggedInUser !== undefined) {
      console.log('logout id is DEFINED as:', this.storageService.loadClient()?.id);

      this.socket.emit('logout', this.loggedInUser.id);


      //this.storageService.deleteClient(this.loggedInUser.id);
      localStorage.clear();
      console.log('local storage cleared:', this.storageService.loadClient()?.id);

      location.reload();

    } else {
      console.log('logout id == undefined:', this.storageService.loadClient()?.nickname);
    }
  }
}
