import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    username: string;
    password: string;
    department: number;
    connect: boolean = false;

    errorMsgC: string = "";
    errorMsgCA: string = "";

    close: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    if (typeof navParams.get("close") !== 'undefined')
      this.close = true;
  }

  login() {
    this.userProvider.login(this.username, this.password).then( (data) => {
        console.log(data);
        this.navCtrl.pop();
    })
    .catch( (err) => {
        this.errorMsgC = err.error;
    });
  }

  createAccount() {
    this.userProvider.createAccount(this.username, this.password, this.department).then( (data) => {
        console.log(data);
    }).catch( (err) => {
        this.errorMsgCA = err.error;
    });
  }

}
