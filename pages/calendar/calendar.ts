import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from '../../components/calendar/calendar';


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
    private header:boolean;
    private date:string;

    private anonymousClass: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.header = navParams.get('header');
    this.date = navParams.get('date');

    if (this.id == "1")
      this.anonymousClass = "anonymous";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
