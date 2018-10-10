import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user'
import { ViewController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    private webcalICS: SafeUrl;

  constructor(private userProvider: UserProvider, 
                public viewCtrl: ViewController, 
                private sanitizer: DomSanitizer) {
    let user = userProvider.getUser();
    this.urlICS = encodeURIComponent("http://ical.prionspourlavie.fr/getICS.php?id="+user.ID+"&token="+user.data.user_pass);
    this.webcalICS = sanitizer.bypassSecurityTrustUrl("webcal://ical.prionspourlavie.fr/getICS.php?id="+user.ID+"&token="+user.data.user_pass);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
