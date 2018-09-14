import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Platform } from 'ionic-angular';
import { BlocPipe } from '../../pipes/bloc/bloc';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;
  param: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private wp: WpProvider,
    public platform: Platform) {
      this.param = navParams.get('param');
        this.wp.getItems("prieres");
        console.log(this.param);
  
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  bloc(value, balise) {
    let b = new BlocPipe();
    return b.transform(value, balise);
  }
}
