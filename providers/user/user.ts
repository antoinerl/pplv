import { HTTP } from '@ionic-native/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user: any;

  constructor(
            @Inject(APP_CONFIG) private config: IAppConfig,
            public http: HTTP) {
  }

  getUser() {
    return this.user;
  }

  loadUser(email, password) {
    let parameters = {
        email: email,
        password: password
    }

    return new Promise(resolve => {
        this.http.get(this.config.wsURL + "/persons/getPerson.php", parameters, {}).then(data => {
          this.user = JSON.parse(data.data).data;
          resolve(data.data);
        }, err => {
          console.log(err);
        });
      });
  }

}
