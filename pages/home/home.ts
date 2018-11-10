import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

import { CalendarPage } from '../../pages/calendar/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private wp: WpProvider
    ) {
        
    }

    openCalendar() {
        this.navCtrl.setRoot(CalendarPage);
    }

}
