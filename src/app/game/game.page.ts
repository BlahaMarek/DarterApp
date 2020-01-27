import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScoringService} from '../services/scoring.service';
import {ModalController} from '@ionic/angular';
import {WinnerPage} from '../winner/winner.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  game: FormGroup;
  currentPlayer: any;
  playerIndex = 0;
  constructor(private scoringSvc: ScoringService, public modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.game = this.scoringSvc.game;
    this.currentPlayer = this.game.get('players.' + this.playerIndex).value;
  }

  get currentScore() {
    return this.game.get('score').value - this.currentPlayer.playerScore;
  }

  nextPlayer() {
    this.playerIndex += 1;
    if (this.playerIndex == (<FormArray>this.game.get('players')).length) {
      this.playerIndex = 0;
    }
    this.currentPlayer = this.game.get('players.' + this.playerIndex).value;
  }

  refreshScore(value) {
    if (this.game.get('players.' + this.playerIndex + ".playerScore").value + value > this.game.get('score').value) {
      return;
    }

    if (this.game.get('players.' + this.playerIndex + ".playerScore").value + value == this.game.get('score').value ) {
      this.showModal().then(value => {
          console.log(value);
      });
    }

    this.game.get('players.' + this.playerIndex + ".playerScore")
        .setValue(this.game.get('players.' + this.playerIndex + ".playerScore").value + +value);
    this.currentPlayer = this.game.get('players.' + this.playerIndex).value;

  }

  async showModal() {
    const modal = await this.modalController.create({
      component: WinnerPage,
      componentProps: {
        'name': this.currentPlayer.player
      }
    });
    modal.onDidDismiss().then(data => {
        if (data.data.again) {
            this.game = this.scoringSvc.game;
            this.currentPlayer = this.game.get('players.' + this.playerIndex).value;
        }
    });
    return await modal.present();
  }
}
