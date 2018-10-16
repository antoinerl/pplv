
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

  toggleHours() {
    this.prayerHours=!this.prayerHours;
  }

  delete(slot) {
    alert(slot);
  }




  public openSlidingItem($event: Event, item: any) {
    // This is to prevent a call to itemSliding.close() in the template
    $event.stopPropagation();

    // Close all other open items to have behavior similar to the drag method
    this.closeAllItems();

    this.isItemOpened = true;

    // In order for the width of the buttons to be calculated the item
    // must be slightly opened
    item._setOpenAmount(1);

    setTimeout(() => {
      const children = Array.from(
        // use _leftOptions if buttons are on the left (could be made to be dynamic)
        item._rightOptions._elementRef.nativeElement.children,
      );
      // Calculate the width of all of the buttons
      const width = children.reduce(
        (acc: number, child: HTMLElement) => acc + child.offsetWidth,
        0,
      );

      // Open to the calculated width
      item.moveSliding(width);
      item._setOpenAmount(width, false);
    }, 0);
  }

  private closeAllItems() {
    if (this.isItemOpened) {
        this.slidingItems.map(item => item.close());
        this.isItemOpened = false;
    }
  }
  
  private disconnect() {
    this.userProvider.disconnect();
    this.navCtrl.setRoot(HomePage);
  }

}
