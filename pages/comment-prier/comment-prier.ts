import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

/**
 * Generated class for the CommentPrierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comment-prier',
  templateUrl: 'comment-prier.html',
})
export class CommentPrierPage {
    private page: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wp: WpProvider) {
  }

  ionViewCanEnter() {
    this.wp.getPage(16).then( (_page) => {
        this.page = _page.page;
    });
  }

}
