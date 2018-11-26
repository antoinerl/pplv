import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrayersProvider } from '../../providers/prayers/prayers';
import * as moment from 'moment';
import 'moment-timezone';
import * as $ from "jquery";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private prayersProvider: PrayersProvider) {
  }

  ionViewDidLoad() {
    let dayIndex = moment.tz("Europe/Paris").format("YYYYMMDD");
    let slot = moment.tz("Europe/Paris").format("HH");

    this.prayersProvider.getPrayers(dayIndex, true, slot).then(function(result) {
        for (let index in result) {
                let path = $("#"+result[index].regionname);
                let rect = path[0].getBoundingClientRect();
                let position = path.position();
                path.css("fill", "orange");
                let top = position.top + rect.height*2/3-50;
                let left = position.left + rect.width/2-15;
                let span = $("<span class='pictoCarte' style='left:"+left+"px;top:"+top+"px'>"+result[index].count+"</span>");
                $("page-map").append(span);
                if (result[index].count.length < 2) {
                        span.addClass("pictoOrange");
                } else {
                        span.addClass("pictoRed");
                }
        }
    });

  }

}
