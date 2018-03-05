import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../interfaces/kid';

/**
 * Generated class for the KidDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kid-detail',
  templateUrl: 'kid-detail.html',
})
export class KidDetailPage {

  public kid: Kid;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if( this.navParams.data.kid.name ) this.kid = this.navParams.data.kid;
  }

  ionViewDidLoad() {}

}
