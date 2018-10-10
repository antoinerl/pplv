import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { CalendarPage } from '../../pages/calendar/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private wp: WpProvider,
    public platform: Platform,
    private localNotifications: LocalNotifications) {
        
        this.platform.ready().then(() => {
            this.localNotifications.schedule({
               text: 'Delayed ILocalNotification',
               trigger: {at: new Date("2018-10-10 16:45:00")},
               sound: 'file://sound.mp3',
               led: 'FF0000'
            });
        });
    }

    openCalendar() {
        this.navCtrl.setRoot(CalendarPage);
    }

}
