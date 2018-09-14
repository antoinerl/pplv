import { Component } from '@angular/core';
import { DateProvider } from '../../providers/date/date';
import * as moment from 'moment';

/**
 * Generated class for the ValidScheduleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'valid-schedule',
  templateUrl: 'valid-schedule.html'
})
export class ValidScheduleComponent {

	nth_weekday: string[] = ["premier", "deuxième", "troisième", "quatrième", "cinquième"];

  text: string;

  constructor(private dateProvider : DateProvider) {
    var tmp = moment.unix(dateProvider.getSelectedDate());
  	var date = tmp.format("dddd D MMMM YYYY");
  	var day = tmp.format("dddd");
  	var nth = this.nth_weekday[Math.floor(tmp.toObject().date / 7)];

  	var hour = dateProvider.getSelectedHour();
  	var recur = dateProvider.getSelectedRecurrence();

  	var endText = " de " + hour + " h à " + (hour+1) + " h";

  	var startText = "";
  	if (recur == 1) {
  		startText += "le " + date;
  	}
  	if (recur == 2) {
  		startText += "tous les " + day + "s";
  	}
  	if (recur == 3) {
  		startText += "tous les " + nth + "s " + day + "s du mois";
  	}

    this.text = startText + endText;
  }

}
