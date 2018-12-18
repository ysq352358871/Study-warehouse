import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the AccountSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-setting',
  templateUrl: 'account-setting.html',
})
export class AccountSettingPage {
  userInfo:any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.userInfo = this.navParams.get('userInfo');
  }
  goUpdatePass(){
    this.navCtrl.push('AccountUpdatePassPage',{
      userInfo:this.userInfo
    });
  }
  updateVersion(){
    let alert = this.alertCtrl.create({
      title: '',
      cssClass:'updateVersion',
      subTitle: 'Currently is the latest version, no version update.',
      buttons: ['Got it!']
    });
    alert.present();
  }
  clearCache(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      cssClass:'clearCache',
      buttons: [
        {
          text: 'Confirm clear cache',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  goFeedback(){
    this.navCtrl.push('AccountFeedbackPage',{
      userInfo:this.userInfo
    });
  }

  goCenter(){
    this.navCtrl.push('AccountCenterPage');
  }

  logOut(){
    //window.localStorage.clear();
    window.localStorage.removeItem('isLogin');
    this.navCtrl.push('LoginPage');
  }
}
