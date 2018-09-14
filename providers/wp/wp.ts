import { HTTP } from '@ionic-native/http';
import { Injectable, Inject } from '@angular/core';
import { File } from '@ionic-native/file';
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

    public items: Array<any> = [];

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    public http: HTTP,
    public platform: Platform,
    public file: File,
    public network: Network) {
      

  }


  getItems(slug): Promise <any> {
    return new Promise( (resolve, reject) => {
      if (this.platform.is('cordova')) {
        if (this.network.type === 'none') {
          this.getWpContentFromFile(slug, resolve, reject);
        }
        else {
          this.downloadWpContent(slug, resolve, reject);
        }
      }
    });
  }

  getWpContentFromFile(slug, resolve, reject) {
    this.file.readAsText(this.file.dataDirectory, slug + '.json').then(data => {
      let jsonObj = JSON.parse(data);
      this.items = jsonObj;
      resolve(this.items);
    });
  }

  downloadWpContent(slug, resolve, reject) {
    this.http.get(this.config.wpURL + "/ws/get_category_posts/?slug=" + slug, {}, {}) 
      .then(data => {
        if(this.platform.is('core') || this.platform.is('mobileweb')) {
            let jsonObj = JSON.parse(data.data);
            this.items = jsonObj;
            resolve(this.items);
        } else {
          this.file.writeFile(this.file.dataDirectory, slug + '.json', data.data, {replace:true})
        .then(data => {
          this.getWpContentFromFile(slug, resolve, reject);
        })
        .catch(error => {
          console.log("error");
        });
        }
        
      })
      .catch(error => {
        console.log("error recuperation Wordpress");
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }


}
