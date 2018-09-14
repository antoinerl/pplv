import { Component, Input } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';
import { RecurrentMenuComponent } from '../recurrent-menu/recurrent-menu';
import * as $ from "jquery";
import { DateProvider } from '../../providers/date/date';

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

	constructor(private dateProvider : DateProvider) {
	}

  @Input()
  set id(id: number) {
    this.idUser = id;
  }

  @Input()
  set recur(recur: boolean) {
    this.recurrence = recur;
  }

	ngAfterViewInit(){
		this.openCalendar();
    $(".hours").addClass("disabled");
    $(".on-selected").addClass("already-selected");
	}

	onChange($event) {
    console.log($event);
    this.dateProvider.setSelectedDate($event.unix());
    this.selectedDate = this.dateProvider.getSelectedDate();
    
	  //$(".hours").show();
    $(".hours").removeClass("disabled");
    if (this.recurrence)
      $("recurrent-menu").show();
	}  

  setHour(hour: number) {
    console.log(this.dateProvider.getSelectedDate());
    if (!this.dateProvider.getSelectedDate())
      return;
    console.log(hour);
    this.dateProvider.setSelectedHour(hour);
    $(".hour").removeClass("selected");
    $("#"+hour).addClass("selected");
    $("#valid").removeClass("disabled");
  }

  valid() {
    if (!this.dateProvider.getSelectedDate() || !this.dateProvider.getSelectedHour())
      return;
    if (this.recurrence && !this.dateProvider.getSelectedRecurrence())
      return;

    this.dateProvider.valid(this.idUser).then(data => {
          $(".hour").removeClass("selected");
          $(".on-selected").removeClass("on-selected");
          this.displayAlert(data);
        })
        .catch(err => {
          console.log(err);
        });;
  }

	openCalendar() {

      //this.dates = ['2018-09-28', '2018-09-29', '2018-10-01'];
      this.dates = [];
      let _daysConfig: DayConfig[] = this.selectDates();

      /*
      _daysConfig.push({
        date: new Date(2018, 8, 26),
        subTitle: '0',
        cssClass: 'empty-ranges'
      });
      */
      
      this.optionsMulti = {
        monthFormat: 'MMMM YYYY',
        monthPickerFormat: ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'],
        weekdays: ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'],
        weekStart: 1,
        pickMode: 'single',
        daysConfig: _daysConfig
      };
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

}
