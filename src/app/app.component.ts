import { Component } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Best-Playz-Frontend';



  /* Can put global error listening here (from comment service)!!
  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }

   */
}
