import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from '../../components/calendar/calendar';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

    private id:string;
    private token:string;
    private header:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    this.id = navParams.get('id');
    this.token = decodeURIComponent(navParams.get('token'));
    this.header = navParams.get('header');

    userProvider.setUser({"ID": this.id, "token": this.token});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
