import { HTTP } from '@ionic-native/http';
import { Injectable, Inject } from '@angular/core';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

	date: number;
	hour: number;
	recur: number;

  constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        public http: HTTP
    ) {
    
  }

  setSelectedDate(date : number) {
  	this.date = date;
  }

  getSelectedDate() {
  	return this.date;
  }

  setSelectedHour(hour : number) {
  	this.hour = hour;
  }

  getSelectedHour() {
  	return this.hour;
  }

  setSelectedRecurrence(recur : number) {
  	this.recur = recur;
  }

  getSelectedRecurrence() {
  	return this.recur;
  }

  valid(id): Promise <any> {
    return new Promise( (resolve, reject) => {

      let time = this.date + this.hour*3600;
      let parameters = {
        _id: id,
        password: "$P$BllpJAyXJj.62cTsWXkDDtfYoAJ/vS1",
        from: String(time)
      }

      this.http.get(this.config.wsURL + "/persons/addTimePerson.php", parameters, {}) 
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
      }
  }
}
