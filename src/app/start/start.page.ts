import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ScoringService} from '../services/scoring.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  game = this.fb.group({
    score: [301, Validators.required],
    players: this.fb.array([ this.createPlayer()])
  });

  constructor(private fb: FormBuilder, private router: Router, private scoringSvc: ScoringService) { }

  ngOnInit() {
  }

  get players(): FormArray {
    return this.game.get('players') as FormArray
  }

  addPlayer() {
    (<FormArray>this.game.get('players')).push(this.createPlayer());
  }

  deletePlayer(index: number) {
    (<FormArray>this.game.get('players')).removeAt(index);
  }

  createPlayer(): FormGroup {
    return this.fb.group({
      player: ["", Validators.required],
      playerScore: [0, Validators.required]
    })
  }

  startGame() {
    this.router.navigate(['/game']);
    this.scoringSvc.setGame(this.game);
  }
}
