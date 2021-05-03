import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LeaderboardService} from './shared/leaderboard.service';
import {Comment} from '../comment/shared/comment';
import {take, takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  highscoreFC = new FormControl('');
  highscores: string[] = [];
  unsubscribe$ = new Subject();


  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    console.log('Leaderboard Component Initialised');
    this.leaderboardService.listenForHighscores()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(highscore => {
        console.log('highscore received');
        this.highscores.push(highscore);
      });
    this.leaderboardService.getAllHighscores()
      .pipe(
        take(1)
      )
      .subscribe(highscores => {
        console.log('highscore received');
        this.highscores = highscores;
      });
    this.leaderboardService.connect();
  }

  postHighscore(): void {
    this.leaderboardService.postHighScore(this.highscoreFC.value);

  }

  ngOnDestroy(): void {
    console.log('Leaderboard Component Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.leaderboardService.disconnect();
  }
}
