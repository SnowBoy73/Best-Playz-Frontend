import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {LeaderboardService} from './shared/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  highscoreFC = new FormControl('');

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
  }

  postHighscore(): void {
    this.leaderboardService.postHighScore(this.highscoreFC.value);

  }
}
