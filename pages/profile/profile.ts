
import { NavController, NavParams, IonicPage, ItemSliding } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DateformatPipe } from '../../pipes/dateformat/dateformat';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChildren(ItemSliding) private slidingItems: QueryList<ItemSliding>;

  private user: any;
  private prayerHours:boolean = false;
  private isItemOpened: boolean = false;

  private header: boolean = true;

  private id:string;
  private token:string;

  private password = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    if (navParams.get('header')) {
      this.header = navParams.get("header");
    }

    if (userProvider.isLogged()) {
      this.load();
      return;
    }

    this.id = navParams.get('id');
    if (this.id) {
      this.token = decodeURIComponent(navParams.get('token'));
      this.header = navParams.get('header');

      userProvider.getUserFromToken(this.id, this.token).then( () => {
        this.load();
      });
    } else {

      this.navCtrl.push(LoginPage, {"close": "true"})
    }
  }

  load() {
    this.user = this.userProvider.getUser();
    if (!this.user.slots) {
        this.userProvider.getSlots();
    }
  }

  ionViewDidLoad() {
  }


  save() {
    this.userProvider.updateAccount("", this.user.data.meta.zipcode);
  }

  savePassword() {
    this.userProvider.updateAccount(this.password, "");
  }

  
  private disconnect() {
    this.userProvider.disconnect();
    this.navCtrl.setRoot(HomePage);
  }

}
