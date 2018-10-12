import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import { map } from "rxjs/operators";

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
    this.storage.set("user", u);
  }

  getSlots() {
    let params = new HttpParams()
          .set('id', String(this.user.ID));

    let headers = new HttpHeaders()
          .set('token', "TOKEN");

    return new Promise(resolve => {
      this.http.get(this.config.wsURL + "/persons/getSlots.php", { 'params': params, 'headers': headers })
        .pipe(
          map(
            (jsonArray: Object[]) => jsonArray.map(jsonItem => jsonItem)
          )
        ).subscribe( (data: any) => {
          var arr = Object.keys(data).map(key => data[key]);
              arr.sort((n1,n2) => n1 - n2); 
              this.user.slots = arr;
              resolve(arr);
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

  getUserFromToken(id: string, token: string) {
    let body = new HttpParams({
      fromObject : {
        'id' : id,
        'token' : token
      }
    });

    return new Promise( (resolve, reject) => {
        this.http.post(this.config.wsURL + "/persons/getUserFromToken.php", body).subscribe(data => {
            if ('error' in data)
              reject(data);
            else {
              this.user = data;
              this.storage.set("user", this.user).then( data => {
                resolve(data);
              })
              
            }
          }, err => {
            console.log(err);
          });
      });
  }

  disconnect() {
    this.user = null;
    this.storage.remove("user");
  }

}
