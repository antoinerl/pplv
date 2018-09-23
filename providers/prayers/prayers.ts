import { HTTP } from '@ionic-native/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';

/*
  Generated class for the PrayersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrayersProvider {

  constructor(
            @Inject(APP_CONFIG) private config: IAppConfig,
            public http: HTTP
        ) {
    
  }

  getPrayers(dayindex, time) {
    let parameters = {
        dayindex: dayindex,
        time: "false"
    }
    if (time) {
        parameters.time = "true";
    }
    return new Promise(resolve => {
        this.http.get(this.config.wsURL + "/prayers/getPrayers.php", parameters, {}).then(data => {
          resolve(JSON.parse(data.data));
        }, err => {
          console.log(err);
        });
      });
  }

}
