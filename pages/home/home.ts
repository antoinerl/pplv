import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CalendarPage } from '../../pages/calendar/calendar';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private ctaText: string;

  constructor(
    public navCtrl: NavController,
    private userProvider: UserProvider
    
    ) {
        
    }

  ionViewDidLoad() {
    if (this.userProvider.isLogged())
      this.ctaText = "Réserver un créneau";
    else
      this.ctaText = "Rejoignez-nous";
  }

  openCalendar() {
      this.navCtrl.setRoot(CalendarPage);
  }

}
