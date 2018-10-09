import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user: any = null;

  constructor(
            @Inject(APP_CONFIG) private config: IAppConfig,
            public http: HttpClient,
            private storage: Storage) {
  }

  getUser() {
    return this.user;
  }

  setUser(u) {
    this.user = u;
  }

  getSlots() {
    let params = new HttpParams()
          .set('id', String(this.user.ID))
          .set('token', String(this.user.data.user_pass));


    return new Promise(resolve => {
        this.http.get(this.config.wsURL + "/persons/getSlots.php", { params: params }).subscribe(data => {
            var arr = Object.keys(data).map(key => data[key]);
            arr.sort((n1,n2) => n1 - n2); 
            this.user.slots = arr;
            resolve(arr);
          }, err => {
            console.log(err);
          });
      });
  }

  isLogged() {
    return this.user !== null;
  }

  createAccount(email: string, password: string, zipcode: number) {
    let body = new HttpParams({
      fromObject : {
        'email' : email,
        'password' : password,
        'zipcode': String(zipcode)
      }
    });

    return new Promise( (resolve, reject) => {
        this.http.post(this.config.wsURL + "/persons/createPerson.php", body).subscribe(data => {
            if ('error' in data) {
              reject(data);
            } else {
              this.user = data;
              this.storage.set("user", this.user);
              resolve(data);
            }
          }, err => {
            console.log(err);
          });
      });
  }

  login(email: string, password: string) {
    let body = new HttpParams({
      fromObject : {
        'email' : email,
        'password' : password
      }
    });

    return new Promise( (resolve, reject) => {
        this.http.post(this.config.wsURL + "/persons/login.php", body).subscribe(data => {
            if ('error' in data)
              reject(data);
            else {
              this.user = data;
              this.storage.set("user", this.user);
              resolve(data);
            }
          }, err => {
            console.log(err);
          });
      });
  }

}
