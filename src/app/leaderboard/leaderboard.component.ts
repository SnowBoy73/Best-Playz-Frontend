import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LeaderboardService} from './shared/leaderboard.service';
import {CommentModel} from '../comment/shared/comment.model';
import {take, takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {HighscoreModel} from './shared/highscore.model';
import {CommentDto} from '../comment/shared/comment.dto';
import {StorageService} from '../shared/storage.service';
import {HighscoreDto} from './shared/highscore.dto';
import {CommentClient} from '../comment/shared/comment.client';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  highscoreFC = new FormControl('');
  highscores: HighscoreModel[] = [];
  unsubscribe$ = new Subject();
  userNickname: string | undefined;


  constructor(private leaderboardService: LeaderboardService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.userNickname = this.storageService.loadCommentClient()?.nickname;
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
    console.log('dto nickname: ', this.storageService.loadCommentClient()?.nickname);
    // loggedInUser = this.storageService.loadCommentClient();
    if (this.storageService.loadCommentClient()?.nickname) {
      if (this.highscoreFC.value) {
        const highscoreDto: HighscoreDto = {
          nickname: this.storageService.loadCommentClient()?.nickname,
          gameId: 1,  // MOCK !!!
          score: this.highscoreFC.value,
          time: 123, // MOCK
        };
        this.leaderboardService.postHighScore(highscoreDto);
        this.highscoreFC.patchValue('');
        // this.leaderboardService.postHighScore(this.highscoreFC.value);
      }
    }
  }

  ngOnDestroy(): void {
    console.log('Leaderboard Component Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.leaderboardService.disconnect();
  }
}
