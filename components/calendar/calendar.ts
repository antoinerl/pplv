import { Component, Input } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';
import { RecurrentMenuComponent } from '../recurrent-menu/recurrent-menu';
import * as $ from "jquery";
import { DateProvider } from '../../providers/date/date';
import { PrayersProvider } from '../../providers/prayers/prayers';

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
  idUser: number;
  recurrence: boolean = true;

  dates: string[];
	type: 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object';
	hours: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  optionsMulti: any;

  _daysConfig: DayConfig[];

	constructor(private dateProvider : DateProvider, private prayersProvider : PrayersProvider) {
    this.init("201809", true);
	}

  init(monthIndex, open) {
    this.prayersProvider.getPrayers(monthIndex, false).then((prayers) => this.displayPrayers(prayers, open));
  }

  @Input()
  set id(id: number) {
    this.idUser = id;
  }

  @Input()
  set recur(recur: boolean) {
    this.recurrence = recur;
  }

  displayPrayers(prayers, open) {
    this.initHours();

    if (open)
      this.dates = [];

    this._daysConfig = this.selectDates();
       
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
    this.dateProvider.setSelectedDate($event.unix());
    this.selectedDate = this.dateProvider.getSelectedDate();
    
    this.prayersProvider.getPrayers(this.toDayindex(this.selectedDate), true).then((data) => this.openHours(data));

	}  

  monthChange($event) {
    this.init($event.newMonth.years+("0"+$event.newMonth.months).slice(-2), false);
  }

  openHours(hours) {
    $(".hour").removeClass("empty-ranges");
    for (let el in hours) {
      let time = hours[el].time;
      $("#hour_"+time+".hour").addClass("empty-ranges");
      $("#hour_"+time+" .number").text(hours[el].count);
    }
      

    $(".hours").removeClass("disabled");
    if (this.recurrence)
      $("recurrent-menu").show();
  }

  setHour(hour: number) {
    if (!this.dateProvider.getSelectedDate())
      return;

    this.dateProvider.setSelectedHour(hour);
    $(".hour").removeClass("selected");
    $("#hour_"+hour).addClass("selected");
    $(".valid").removeClass("disabled");
  }

  valid() {
    if (this.recurrence && !this.dateProvider.getSelectedRecurrence())
      return;

    this.dateProvider.valid(this.idUser).then(data => {
          this.init("201809", false);
          this.displayAlert(data);
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
    $(".hours").addClass("disabled");
    $(".hour").removeClass("empty-ranges");
    $(".hour").removeClass("selected");
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
