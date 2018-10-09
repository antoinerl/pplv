import { HttpClient, HttpParams } from '@angular/common/http';
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
            public http: HttpClient) {
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
          .set('token', String(this.user.token));


    return new Promise(resolve => {
        this.http.get(this.config.wsURL + "/persons/getSlots.php", { params: params }).subscribe(data => {
            this.user.slots = data;
            resolve(data);
          }, err => {
            console.log(err);
          });
      });
  }

  isLogged() {
    return this.user !== undefined;
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
            else
              resolve(data);
          }, err => {
            console.log(err);
          });
      });
  }

}
