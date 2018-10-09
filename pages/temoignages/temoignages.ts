import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Platform } from 'ionic-angular';
import { BlocPipe } from '../../pipes/bloc/bloc';

/**
 * Generated class for the TemoignagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-temoignages',
  templateUrl: 'temoignages.html',
})
export class TemoignagesPage {
  selectedItem: any;
  icons: string[];
  posts: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private wp: WpProvider,
    public platform: Platform) {
        this.wp.getItems("temoignages").then( (data) => {
          this.posts = data.posts;
        });
  
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TemoignagesPage, {
      item: item
    });
  }

  bloc(value, balise) {
    let b = new BlocPipe();
    return b.transform(value, balise);
  }
}
