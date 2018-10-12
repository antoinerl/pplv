import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { map } from "rxjs/operators";

/*
  Generated class for the PrayersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrayersProvider {

  constructor(
            @Inject(APP_CONFIG) private config: IAppConfig,
            public http: HttpClient
        ) {
    
  }

  getPrayers(dayindex, time) {
    let params = new HttpParams()
        .set('dayindex', String(dayindex))
        .set('time', "false");
        
    if (time) {
        params = params.set('time', "true");
    }
    return new Promise(resolve => {
        this.http.get(this.config.wsURL + "/prayers/getPrayers.php", { params: params })
        .pipe(
          map(
            (jsonArray: Object[]) => jsonArray.map(jsonItem => jsonItem)
          )
        ).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

}
