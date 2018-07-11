import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestPage } from '../test/test';
import {ConfigureTestPage} from '../configure-test/configure-test';

/**
 * Generated class for the ChaptersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chapters-list',
  templateUrl: 'chapters-list.html',
})
export class ChaptersListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChaptersListPage');
  }
  pushPage(item){
    this.navCtrl.push(ConfigureTestPage,{
      id:item
    });
  }
}
