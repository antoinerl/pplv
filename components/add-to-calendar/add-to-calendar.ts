import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user'
import { ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the AddToCalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-to-calendar',
  templateUrl: 'add-to-calendar.html'
})
export class AddToCalendarComponent {
    private urlICS: string;
    private webcalICS: string;

  constructor(private userProvider: UserProvider, public viewCtrl: ViewController, private sanitizer: DomSanitizer) {
    this.urlICS = encodeURIComponent("http://ical.prionspourlavie.fr/getICS.php?id=29&token=%24P%24BLWRgd0EBCV9BAfIVK1CawMDY9QpQb1");
    this.webcalICS = sanitizer.bypassSecurityTrustUrl("webcal://ical.prionspourlavie.fr/getICS.php?id=29&token=%24P%24BLWRgd0EBCV9BAfIVK1CawMDY9QpQb1");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
