import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Platform } from 'ionic-angular';
import { PrierePage } from '../priere/priere';

/**
 * Generated class for the PrieresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prieres',
  templateUrl: 'prieres.html',
})
export class PrieresPage {
  selectedSlug: string;
  selectedItem: any;
  icons: string[];
  posts: Array<any> = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private wp: WpProvider,
    public platform: Platform) {
        this.wp.getItems("prieres").then( (data) => {
          this.order(data.posts);
        });
  
  }

  order(posts) {
    let slugs = ["prieres"];
    for (let post of posts) {
        for (let category of post.categories) {
            if (!slugs.some(e => e === category.slug)) {
                slugs.push(category.slug);
                this.posts.push({'slug': category.slug, 'category': category.title, 'posts':new Array<any>()})
            }
            if (category.slug !== "prieres") {
                this.posts.find(e => e.slug === category.slug).posts.push(post);
            }
        }
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(PrierePage, {
      post: item
    });
  }

  categoryTapped(event, slug) {
    this.selectedSlug = slug;
  }

}
 