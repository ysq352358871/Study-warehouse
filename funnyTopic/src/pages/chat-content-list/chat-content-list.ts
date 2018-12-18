import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatContentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-content-list',
  templateUrl: 'chat-content-list.html',
})
export class ChatContentListPage {
  isManagementAction:boolean = false; // 是否在执行管理评论操作
  manageBtnText:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.manageBtnText = 'Manage'
  }

  ionViewDidLoad() {
  }

  getCommentItems(e:any){
    if(!e.target.value.trim()){

    }
  }

  manageAction(){ // 执行评论管理
    if(!this.isManagementAction){
      this.isManagementAction = true;
      this.manageBtnText = 'Complete';
    }else{
      this.isManagementAction = false;
      this.manageBtnText = 'Manage';
    }
  }
}
