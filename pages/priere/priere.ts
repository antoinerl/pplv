import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrierePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-priere',
  templateUrl: 'priere.html',
})
export class PrierePage {

    post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = navParams.get("post");
  }

  ionViewDidLoad() {
    
  }

}
