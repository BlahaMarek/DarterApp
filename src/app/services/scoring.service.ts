import { Injectable } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  private _game: FormGroup;
  constructor( private router: Router) {
  }

  get game(): FormGroup {
    if (!this._game) {
      this.router.navigate(['/start']);
      return;
    }
    return this._game;
  }

  setGame(game: FormGroup) {
    this._game = game;
  }

  again() {
    (<FormArray>this._game.get('players')).controls.forEach(player => {
      player.get('playerScore').setValue(0);
    });
  }

}
