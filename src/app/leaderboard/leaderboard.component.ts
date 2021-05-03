import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LeaderboardService} from './shared/leaderboard.service';
import {Comment} from '../comment/shared/comment';
import {takeUntil} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  highscoreFC = new FormControl('');
  highscores: string[] = [];
  private sub: Subscription | undefined;

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    console.log('Leaderboard Component Initialised');
    this.sub = this.leaderboardService.listenForHighscores()
      .subscribe(highscore => {
        console.log('highscore listened');
        this.highscores.push(highscore);
      });
  }

  postHighscore(): void {
    this.leaderboardService.postHighScore(this.highscoreFC.value);

  }

  ngOnDestroy(): void {
    console.log('Leaderboard Component Destroyed');
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
