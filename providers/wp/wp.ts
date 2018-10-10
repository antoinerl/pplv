import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';

/*
  Generated class for the WpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WpProvider {

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    public http: HttpClient,
    public platform: Platform,
    private storage: Storage,
    public network: Network) {
      

  }


  getItems(slug): Promise <any> {
    return new Promise( (resolve, reject) => {
      if (this.platform.is('cordova')) {
        if (this.network.type === 'none') {
          this.getWpContentFromStorage(slug, resolve, reject);
        }
        else {
          this.downloadWpContent(slug, resolve, reject);
        }
      }
    });
  }

  getPage(id): Promise <any> {
    let pageName = "page_"+id;
    return new Promise( (resolve, reject) => {
      console.log("ici");
      if (this.platform.is('cordova')) {
        console.log("cordova");
        if (this.network.type === 'none') {
          console.log("pas de reseau");
          this.getWpContentFromStorage(pageName, resolve, reject);
        } else {
          console.log("reseau");
          this.downloadWpPage(id, resolve, reject);
        }
      }
    });
  }

  getWpContentFromStorage(slug, resolve, reject) {
    this.storage.get(slug).then(data => {
      //let jsonObj = JSON.parse(data);
      resolve(data);
    });
  }

  downloadWpContent(slug, resolve, reject) {

    this.http.get(this.config.wpURL + "/ws/get_category_posts/?slug=" + slug, {}) 
      .subscribe(data => {
        /*
        if(this.platform.is('core') || this.platform.is('mobileweb')) {
          console.log("web");
          resolve(data);
        } else {
          console.log("mobile");
          */
          this.storage.set(slug, data);
          resolve(data);
        //}
      }, error => {
        console.log("error recuperation Wordpress");
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  downloadWpPage(id, resolve, reject) {
    let namePage = "page_" + id;
    this.http.get(this.config.wpURL + "/ws/get_page/?id=" + id, {}) 
      .subscribe(data => {
        /*
        if(this.platform.is('core') || this.platform.is('mobileweb')) {
            resolve(data);
        } else {
        */
          this.storage.set(namePage, data);
          resolve(data);
        //}
      }, error => {
        console.log("error recuperation Wordpress");
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }


}
