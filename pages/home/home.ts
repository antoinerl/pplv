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
            let isAndroid=true;
            this.localNotifications.schedule({
               text: 'Delayed ILocalNotification',
               trigger: {at: new Date("2018-11-08 21:37:00")},
               sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
               led: 'FF0000'
            });
        });
    }

    openCalendar() {
        this.navCtrl.setRoot(CalendarPage);
    }

}
