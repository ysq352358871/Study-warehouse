import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'NewsPage';
  //tab3Root = PublishPage;
  tab4Root = 'FocusPage';
  tab5Root = 'AccountPage';
  constructor(public navCtrl: NavController,) {
  }

  goNewsCheck(){
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
    }
  }
  goAccountCheck(){
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
    }
  }
}
