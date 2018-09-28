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

	nth_weekday: string[] = ["premier", "deuxième", "troisième", "quatrième", "cinquième"];

  date: string = "jeudi 25 mai";
  day: string = "jeudi";
  nth: string = "premier";

  constructor(private dateProvider : DateProvider, private msgMD: ModalController) {

  }

  @Input()
  set selectedDate(selectedDate : number) {
  	var tmp = moment(selectedDate*1000);
  	console.log(selectedDate);
  	this.date = tmp.format("dddd D MMMM YYYY");
  	this.day = tmp.format("dddd");
  	this.nth = this.nth_weekday[Math.floor(tmp.toObject().date / 7)];
  }

  setSelectedRecurrence(recur : number) {
  	this.dateProvider.setSelectedRecurrence(recur);
    /*
  	var msg = this.msgMD.create(ValidScheduleComponent);
    msg.present();
    */
  }


}
