import { Component, Input  } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ValidScheduleComponent } from '../../components/valid-schedule/valid-schedule'
import { DateProvider } from '../../providers/date/date';
import * as moment from 'moment';

/**
 * Generated class for the RecurrentMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recurrent-menu',
  templateUrl: 'recurrent-menu.html'
})
export class RecurrentMenuComponent {
  selectedRecurrence: number = 1;
  isEnabled: boolean = false;

	nth_weekday: string[] = ["premier", "deuxième", "troisième", "quatrième", "cinquième"];

  date: string = "jeudi 25 mai";
  day: string = "jeudi";
  nth: string = "premier";

  constructor(private dateProvider : DateProvider, private msgMD: ModalController) {
    
  }

  @Input()
  set selectedDate(selectedDate : number) {
  	var tmp = moment(selectedDate*1000);
  	this.date = tmp.format("dddd D MMMM YYYY");
  	this.day = tmp.format("dddd");
  	this.nth = this.nth_weekday[Math.floor( (tmp.toObject().date-1) / 7)];
  }

  @Input()
  set enabled(recurrentEnabled : boolean) {
    this.isEnabled = recurrentEnabled;
  }

  setSelectedRecurrence(recur) {
  	this.dateProvider.setSelectedRecurrence(recur);
  }


}
