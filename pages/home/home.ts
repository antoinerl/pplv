import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Platform } from 'ionic-angular';

import { CalendarComponent } from '../../components/calendar/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private wp: WpProvider,
    public platform: Platform) {

    }

}
