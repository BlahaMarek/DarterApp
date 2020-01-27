import {Component, Input, OnInit} from '@angular/core';
import {ScoringService} from '../services/scoring.service';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.page.html',
  styleUrls: ['./winner.page.scss'],
})
export class WinnerPage implements OnInit {
  @Input() name: string;
  constructor( private scoringSvc: ScoringService, private modalCtrl: ModalController, private router: Router ) { }

  ngOnInit() {
  }

  again() {
    this.scoringSvc.again();
    this.modalCtrl.dismiss({
      'again': true
    });
  }

  newGame() {
    this.scoringSvc.again();
    this.router.navigate(["/start"]);
    this.modalCtrl.dismiss({
      'again': false
    });
  }

}
