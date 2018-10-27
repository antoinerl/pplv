import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/user/user';

import { HomePage } from '../pages/home/home';
import { PrieresPage } from '../pages/prieres/prieres';
import { TemoignagesPage } from '../pages/temoignages/temoignages';
import { CalendarPage } from '../pages/calendar/calendar';
import { PlanningPage } from '../pages/planning/planning';
import { CommentPrierPage } from '../pages/comment-prier/comment-prier';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { Storage } from '@ionic/storage';


import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, params: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private storage: Storage,
              private userProvider: UserProvider) {

    if (window.addEventListener) {
       window.addEventListener("message", this.receiveMessage.bind(this), false);
     } else {
        (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
     }

    this.initializeApp();

    this.pages = [
      { title: 'Accueil', component: HomePage, params: {} },
      { title: 'Calendrier/ Planning', component: CalendarPage, params: {'id': 0, 'token': 0} },
      /*{ title: 'Planning', component: PlanningPage, params: {} },*/
      { title: 'Comment prier ?', component: CommentPrierPage, params: {} },
      { title: 'Prières', component: PrieresPage, params: {'slug' : 'prieres'} },
      { title: 'Témoignages', component: TemoignagesPage, params: {'slug' : 'temoignages'} },
      { title: 'Mon profil', component: ProfilePage, params: {'id': 0, 'token': 0} },
      { title: 'Connexion', component: LoginPage, params: {"close":"true"} }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      moment.locale("fr");

      this.storage.get("user").then(data => {
        if (data === null)
          return;
        this.userProvider.setUser(data);
        /*
        let connectPage = this.pages.find(e => e.title == "Connexion");
        connectPage.title = "Mon profil";
        connectPage.component = ProfilePage;
        */
      })

      window.addEventListener("message", () => {
        this.receiveMessage();
      }, false);
    });
  }

  receiveMessage: any = (event: any) => {
    alert(event.origin);
    if (event.origin !== "https://www.prionspourlavie.fr")
      return;

    alert(event.data);
    let message=event.data.split("/");
    console.log(message);
    let page;
    switch(message[0]) {
      case "calendar" : {
        //page = {component: CalendarPage, params: {'id': parseInt(message[1]), 'token': message[2], 'header': 'false'} };
        this.navCtrl.setRoot(PlanningPage, {"header": 'false'});
        break;
      }
      case "planning" : {
        //page = {component: PlanningPage, params: {'id': parseInt(message[1]), 'token': message[2], 'header': 'false'} }
        this.navCtrl.setRoot(PlanningPage, {"header": 'false'});
        break;
      }
    }
    this.openPage(page);
  }

  display(page) {
    if (this.userProvider.isLogged() && page.title == "Connexion")
      return false;
    
    if (!this.userProvider.isLogged() && page.title == "Mon profil")
      return false;

    return true;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == "Connexion")
      this.nav.push(page.component, page.params);
    else if (page.title == "Déconnexion") {
      this.userProvider.setUser(null);
      this.storage.remove("user");
      let connectPage = this.pages.find(e => e.title == "Mon Profil");
        connectPage.title = "Connexion";
        connectPage.component = LoginPage;
        connectPage.params = {"close":"true"};
    } else
      this.nav.setRoot(page.component, page.params);
    
  }
}
