import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChaptersListPage } from '../chapters-list/chapters-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  pushPage(){
    this.navCtrl.push(ChaptersListPage);
  }
}
