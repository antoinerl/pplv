import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PrieresPage } from '../pages/prieres/prieres';
import { TemoignagesPage } from '../pages/temoignages/temoignages';
import { CalendarPage } from '../pages/calendar/calendar';
import { CommentPrierPage } from '../pages/comment-prier/comment-prier';
import { LoginPage } from '../pages/login/login';


import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, params: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Accueil', component: HomePage, params: {} },
      { title: 'Calendrier', component: CalendarPage, params: {'id' : '29', 'token' : '$P$BLWRgd0EBCV9BAfIVK1CawMDY9QpQb1', 'header': 'true'} },
      { title: 'Comment prier ?', component: CommentPrierPage, params: {} },
      { title: 'Prières', component: PrieresPage, params: {'slug' : 'prieres'} },
      { title: 'Témoignages', component: TemoignagesPage, params: {'slug' : 'temoignages'} },
      /*{ title: 'Mon profil', component: TemoignagesPage, params: {'slug' : 'temoignages'} }*/
      { title: 'Connexion', component: LoginPage, params: {} }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      moment.locale("fr");
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.params);
  }
}
