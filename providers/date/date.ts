import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';

import { UserProvider } from '../user/user';

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
        public http: HttpClient,
        private userProvider: UserProvider
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

  valid(): Promise <any> {
    return new Promise( (resolve, reject) => {

      let time = this.date + this.hour*3600;
      var tmp = moment.unix(this.date);
      let nth = "";
      if (this.recur == 3)
        nth = String(Math.floor( (tmp.toObject().date-1) / 7) + 1);
      let day_of_week = "";
      if (this.recur > 1)
        day_of_week = String(tmp.day());

      let user = this.userProvider.getUser();

      let params = new HttpParams()
          .set('_id', String(user.ID))
          .set('password', user.data.user_pass)
          .set('from', String(time))
          .set('nth', nth)
          .set('day_of_week', day_of_week);

      this.http.get(this.config.wsURL + "/persons/addTimePerson.php", {params: params}) 
        .subscribe(data => {
          delete this.date;
          delete this.hour;
          resolve("ok");
        }, err => {
          reject(err);
        });
    });
  }
}
