import { NavController, NavParams, IonicPage, ItemSliding, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DateProvider } from '../../providers/date/date';
import { DateformatPipe } from '../../pipes/dateformat/dateformat';
import { Component, ViewChildren, QueryList } from '@angular/core';
import * as $ from "jquery";
import { CalendarPage } from '../../pages/calendar/calendar';
import { LoginPage } from '../../pages/login/login';
import { AddToCalendarComponent } from '../../components/add-to-calendar/add-to-calendar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';

/**
 * Generated class for the PlanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-planning',
  templateUrl: 'planning.html',
})
export class PlanningPage {
  @ViewChildren(ItemSliding) private slidingItems: QueryList<ItemSliding>;

  private user: any;
  private isItemOpened: boolean = false;

  private id:string;
  private token:string;
  private header:boolean = true;

  reminderNotif: boolean = false;
  reminderNotifTime: number = 15;

  private prayerHours:boolean = false;

  private newSlots: Array<any>;

  private thanks:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              private userProvider: UserProvider,
              private dateProvider: DateProvider,
              public platform: Platform,
              private localNotifications: LocalNotifications) {
    if (navParams.get('thanks'))
      this.thanks = true;

    if (navParams.get('header')) {
      this.header = navParams.get("header") !== "false";
    }

    if (typeof navParams.get('slots') !== "undefined") {
      this.newSlots = Object.keys(navParams.get('slots')).map(key => navParams.get('slots')[key]);
    } 

    if (userProvider.isLogged()) {
      this.load();
      return;
    }

    this.id = navParams.get('id');
    if (this.id) {
      this.token = decodeURIComponent(navParams.get('token'));

      userProvider.getUserFromToken(this.id, this.token).then( () => {
        this.load();
      });
    } else {
      this.navCtrl.push(LoginPage, {"close": "true"})
    }
  }

  load() {
    this.user = this.userProvider.getUser();
    this.userProvider.getSlots();

    this.userProvider.getLocalNotif().then( (value) => {
      if (value == null || value == 0) 
        this.reminderNotif = false;
      else {
        this.reminderNotif = true;
        this.reminderNotifTime = value;
        if (typeof this.newSlots !== "undefined") {
          this.localNotifications.cancelAll().then(() => {
            setTimeout( () => {
              this.toggleNotifReminder();
            }, 1000);
          });
        }
      }
    })
  }

  ionViewDidLoad() {
  }

  delete(slot, recur) {
    this.dateProvider.removeSlot(slot, recur).then( () => {
      this.userProvider.getSlots();
    });
  }

  isNewSlot(slot) {
    return this.newSlots === undefined || this.newSlots.some(e => e == slot);
  }

  presentSyncModal() {
     let syncModal = this.modalCtrl.create(AddToCalendarComponent, {}, { 'cssClass' : 'syncCal'});
     syncModal.present();
   }

  public openSlidingItem($event: Event, item: any) {
    if (!this.header)
      return;
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

  openAgenda() {
    this.localNotifications.isScheduled(1).then( value => {console.log(value)});
    this.navCtrl.setRoot(CalendarPage, {"header": ""+this.header});
  }

  toggleMailReminder() {  
    if (this.user.data.meta.reminderMail) {
      if (!this.user.data.meta.reminderMailTime) 
        this.user.data.meta.reminderMailTime = 15;
      this.dateProvider.setReminder(String(this.user.data.meta.reminderMailTime));
    } else {
      this.dateProvider.setReminder("delete");
    }
  }

  toggleNotifReminder() {
    if (this.reminderNotif) {
        if (!this.reminderNotifTime) 
          this.reminderNotifTime = 15;

        for (let slot of this.user.slots) {
          this.addNotifReminder(slot);
        }
    } else {
      this.localNotifications.cancelAll();
    }
    this.userProvider.setLocalNotif(this.reminderNotifTime);
  }

  addNotifReminder(slot) {
    const utc = 'UTC';
    const europe = 'Europe/Paris';

    let m = moment(new Date(slot*1000));
    let momentUTC = m.tz(utc);
    let momentEurope = moment.tz(momentUTC.format('YYYY-MM-DD HH:mm'),'YYYY-MM-DD HH:mm', europe);
    momentEurope.subtract(this.reminderNotifTime, "minutes");

    let dfp = new DateformatPipe();
    let sound = this.platform.is("android") ? 'file://sound.mp3': 'file://beep.caf';

    this.localNotifications.schedule({
      id: momentUTC.toDate().getTime(),
       text: "N'oubliez pas votre prière pour la vie à " + momentUTC.format("HH") + "h"+ momentUTC.format("mm"),
       trigger: {at: momentEurope.toDate()},
       sound: sound,
       led: 'FF0000'
    });

  }

  toggleHours() {
    this.newSlots = undefined;
    this.prayerHours=!this.prayerHours;
  }

}