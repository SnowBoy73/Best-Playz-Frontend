import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {StorageService} from './shared/storage.service';
import {ClientModel} from './comment/shared/client.model';
import {FormControl} from '@angular/forms';
import {Socket} from 'ngx-socket-io';
import {loginDto} from './comment/shared/login.dto';
import {WelcomeDto} from './comment/shared/welcome.dto';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Best-Playz-Frontend';
  isLoggedIn = localStorage.length;
  userNickname: string | undefined;
  loggedInUser: ClientModel | undefined;
  loginRequest: boolean | undefined;
  loginFC = new FormControl('');
  unsubscribe$ = new Subject();
  gameSelected = 'Super Ninja Dude';
  allGames: string[] = ['Super Ninja Dude', 'Radical CakeMan', 'Crazy Smurf Bash', 'Happy Flower Waterer'];
  chosenGame: string | undefined;
  error = '';

  constructor(
    firestore: AngularFirestore,
    public router: Router,
    private storageService: StorageService,
    private socket: Socket,
  ) { }

  ngOnInit(): void {
    this.error = '';
    this.listenForCommentWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.loggedInUser = welcome.client;
        this.storageService.saveClient(this.loggedInUser);
        console.log('saved LIU: ', this.loggedInUser.nickname);
        location.reload();

      });
    const oldClient = this.storageService.loadClient();
    console.log('Old Client id: ' + oldClient?.id + ' nickname: ' + oldClient?.nickname);
    if (oldClient) {
      this.loggedInUser = this.storageService.loadClient();
      console.log('Client id: ' + this.loggedInUser?.id + ' nickname: ' + this.loggedInUser?.nickname);
      this.connect(); // MUY IMPORTANTÉ!!
    }
  }


  listenForCommentWelcome(): Observable < WelcomeDto > { // to service?
    console.log('app comp - listenForCommentWelcome called');
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  login(): void {
    this.loginRequest = true;
  }

  sendLogin(): void { // should really be in a service but ... you know...
    console.log('sendLogin method');
    if (this.loginFC.value) {
      const dto: loginDto = {nickname: this.loginFC.value};
      console.log(dto.nickname);
      this.socket.emit('login', dto);
      this.loginRequest = false;
    }
  }

  logout(): void {
    console.log('Logout called in App Comp');
    this.loggedInUser = this.storageService.loadClient();
    console.log('logout id :', this.storageService.loadClient()?.id);
    if (this.loggedInUser !== undefined) {
      console.log('logout id is DEFINED as:', this.storageService.loadClient()?.id);
      this.socket.emit('logout', this.loggedInUser.id);
      // this.storageService.deleteClient(this.loggedInUser.id);  // Better, but not working... why??!
      localStorage.clear();  // Brutal, but works for now
      console.log('local storage cleared:', this.storageService.loadClient()?.id);
      location.reload();
    } else {
      console.log('logout id == undefined:', this.storageService.loadClient()?.nickname);
    }
  }


  connect(): void{ // to service?
    this.socket.connect();
  }

  disconnect(): void{ // to service?
    this.socket.disconnect();
  }



  onNgModelChange($event: any): any {
    console.log('game onNgModelChange called');

    if (this.gameSelected.length !== 0)
    {
      const gameId = this.gameSelected[0];
      this.chosenGame = this.allGames.find(cg => cg === gameId);
      if (this.chosenGame === 'Super Ninja Dude') {
        this.error = '';
        this.router.navigate(['/leaderboard'], {state: {data: gameId}});
      } else {
        this.error = 'Error - this game is not yet supported';

      }
    }
  }



}
