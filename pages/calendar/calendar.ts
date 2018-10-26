import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from '../../components/calendar/calendar';
import { UserProvider } from '../../providers/user/user';

import { LoginPage } from '../../pages/login/login';
import { PlanningPage } from '../../pages/planning/planning';


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
    @ViewChild (CalendarComponent) calendar:CalendarComponent;

    private id:string;
    private token:string;
    private header:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {

    if (navParams.get('header')) {
      this.header = navParams.get("header") !== "false";
    }

    if (this.header && userProvider.isLogged()) {
      return;
    }

    this.id = navParams.get('id');

    if (this.id) {
      this.token = decodeURIComponent(navParams.get('token'));
      this.header = navParams.get('header');

      userProvider.getUserFromToken(this.id, this.token).then( () => {
      console.log("loading from scratch");
        this.calendar.load();
      });
    } else {
      this.navCtrl.push(LoginPage, {"close": "true"})
    }
  }

  ionViewDidEnter() {
  console.log("loading " + userProvider.getUser());
      this.calendar.load();
  }

  openPlanning() {
    this.navCtrl.setRoot(PlanningPage, {"header": this.header});
  }
}
