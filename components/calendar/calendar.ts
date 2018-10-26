import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';
import 'moment-timezone';
import { RecurrentMenuComponent } from '../recurrent-menu/recurrent-menu';
import * as $ from "jquery";
import { DateProvider } from '../../providers/date/date';
import { PrayersProvider } from '../../providers/prayers/prayers';
import { UserProvider } from '../../providers/user/user';

import { PlanningPage } from '../../pages/planning/planning';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
})
export class CalendarComponent {

  selectedDate: number;
  recurrence: boolean = true;
  headerVisible: boolean = true;
  recurrentEnabled: boolean = false;

  dates: string[];
	type: 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object';
	hours: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  optionsMulti: any;

  _daysConfig: DayConfig[] = [];

	constructor(
        private platform: Platform,
        private dateProvider : DateProvider, 
        private prayersProvider : PrayersProvider, 
        private userProvider: UserProvider,
        private navCtrl: NavController) {

	}

  public load() {
    this.platform.ready().then( (readySource) => {
      if (this.userProvider.isLogged() && !this.userProvider.getUser().slots) {
        this.userProvider.getSlots().then(data => {
          this.init(moment().format("YYYYMM"));
        });
      } else {
        this.init(moment().format("YYYYMM"));
      }
    });
  }

  init(monthIndex) {
      this.recurrentEnabled = false;
      $(".hour").removeClass("selected");
      $(".hour").removeClass("already-selected");
      $(".hour").removeClass("empty-ranges");
      $(".hour").removeClass("selected");
      $(".valid").addClass("disabled");
      $(".slots").addClass("disabled");

      if (this.userProvider.isLogged())
        this.prepareUserSlots();
      
      this.prayersProvider.getPrayers(monthIndex, false).then((prayers) => { this.displayPrayers(prayers); });
    
  }

  @Input()
  set recur(recur: boolean) {
    this.recurrence = recur;
  }

  @Input()
  set header(header: boolean) {
    this.headerVisible = header;
  }

  prepareUserSlots() {
    let slots = this.userProvider.getUser().slots;
    for (let slot in slots) {
      this._daysConfig.push({
            date: new Date(moment(slots[slot]*1000).utc().format("YYYY-MM-DD H:mm:ss")),
            cssClass: 'already-selected'
        });
    }
  }

  displayPrayers(prayers) {
  
    this.initHours();
      
    for (let el in prayers) {
      let _date = this.toDate(prayers[el].dayindex);

      this._daysConfig.push({
        date: _date,
        /*subTitle: '0',*/
        cssClass: 'empty-ranges'
      });
    }

    this.openCalendar();
    
    $(".on-selected").addClass("already-selected");
    $(".on-selected").removeClass("on-selected");
  }

	onChange($event) {
  alert("ici");
    let unixUTC = moment.tz($event.format("YYYY-MM-DD"), "UTC").unix();
    this.dateProvider.setSelectedDate(unixUTC);
    this.selectedDate = this.dateProvider.getSelectedDate();

    this.prayersProvider.getPrayers(this.toDayindex(this.selectedDate), true).then((data) => this.openHours(unixUTC, data));

	}  

  monthChange($event) {
    this.init($event.newMonth.years+("0"+$event.newMonth.months).slice(-2));
  }

  openHours(date, hours) {

    $(".hour").removeClass("empty-ranges");
    $(".hour").removeClass("already-selected");

    for (let el in hours) {
      let time = hours[el].time;
      $("#hour_"+time+".hour").addClass("empty-ranges");
      $("#hour_"+time+" .number").text(hours[el].count);
    }
      
    let slots = this.userProvider.getUser().slots;
    for (let slot in slots) {
      let time = slots[slot];
      if (time >= date && time < date+24*3600) {
        let hour = moment(time*1000).utc().format("H");        
        $("#hour_"+hour+".hour").addClass("already-selected");
      }
    }

    $(".slots").removeClass("disabled");
  }

  setHour(hour: number) {
    if (!this.dateProvider.getSelectedDate())
      return;

    this.dateProvider.setSelectedHour(hour);
    $(".hour").removeClass("selected");
    $("#hour_"+hour).addClass("selected");
    this.recurrentEnabled = true;
    $(".valid").removeClass("disabled");
  }

  valid() {
    if (this.recurrence && !this.dateProvider.getSelectedRecurrence())
      return;

    this.dateProvider.valid().then(newSlots => {
          this.userProvider.getSlots().then(slots => {
            this.init(moment().format("YYYYMM"));
          });
          //this.displayAlert(newSlots);
          this.navCtrl.setRoot(PlanningPage, {'header': this.headerVisible, 'thanks':true, 'slots': newSlots});
        })
        .catch(err => {
          console.log(err);
        });;
  }

	openCalendar() {    
      
      this.optionsMulti = {
        monthFormat: 'MMMM YYYY',
        monthPickerFormat: ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'],
        weekdays: ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'],
        weekStart: 1,
        pickMode: 'single',
        daysConfig: this._daysConfig,
      };
  }

  initHours() {
  /*
    $(".hour").removeClass("empty-ranges");
    $(".hour").removeClass("selected");
  */
  }

  selectDates(): DayConfig[] {
    let _daysConfig: DayConfig[] = [];

    for (let d of this.dates) {
        _daysConfig.push({
        date: new Date(d),
        cssClass: 'already-selected'
      });
    }

    return _daysConfig;
  }

  displayAlert(data) {
    parent.postMessage(data, "*");
  }

  toDate(dayindex): Date {
    return new Date(dayindex.substr(0,4)+"-"+dayindex.substr(4,2)+"-"+dayindex.substr(6,2));
  }

  toDayindex(unix) : string {
    let d = new Date(unix*1000);
    return d.getFullYear() + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2);  
  }

}
