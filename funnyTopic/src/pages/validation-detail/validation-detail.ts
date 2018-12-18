import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatServiceClass } from '../../providers/chatService';

import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
/**
 * Generated class for the ValidationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-validation-detail',
  templateUrl: 'validation-detail.html',
})
export class ValidationDetailPage {
  userInfo:any;
  userName:string;  //申请入群的用户的用户名
  groupName:string;
  groupId:any;
  topicId:any;
  serveGroupId:any;
  applyUserId:any;
  nickname:string;
  avatarThumbPath:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq:clientRequestService,
    private config: Config,
    private chatService: ChatServiceClass
  ) {

  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.userInfo = this.navParams.get("userInfo");
    this.userName = this.navParams.get('userName');
    this.groupName = this.navParams.get('groupName');
    this.groupId = this.navParams.get('groupId');
    this.topicId = this.navParams.get('topicId');
    this.serveGroupId = this.navParams.get('serveGroupId');
    this.applyUserId = this.navParams.get('applyUserId');
    this.nickname = this.navParams.get('nickname');
    this.avatarThumbPath = this.navParams.get('avatarThumbPath');
    // console.log(JSON.stringify( this.userInfo),"----apply detail")
  }

  send(type){
    this.chatService.sendTextMessage({ type:'single',text:type,username: this.userName,extras: {type:'addGroup',status:type,groupName:this.groupName}},(res)=>{
      switch (type){
        case 'agree':
          this.agreeAddGroup();
          break;
        case "refuse":
          this.back();
          break;
      }
    },(err)=>{
      console.log(JSON.stringify(err));
    })
  }

  agreeAddGroup(){
    this.chatService.addGroupMembers({id: this.groupId, usernameArray: [this.userName]},(res)=>{
      this.clientReq.requestData([{url:this.config.url+'group/joinGroupChat',params:[{groupId:this.serveGroupId,token:this.userInfo.token,userId:this.userInfo.userId,topicId:this.topicId,memberId:this.applyUserId}],method:"GET"}],res =>{
        this.back();
      },error =>{
        console.log(error,"请求出错了123");
      })
    },(err)=>{
      console.log(err,"----添加群成员失败")
    })
  }

  back(){
    this.navCtrl.pop()
  }
  goCenter(){
    this.navCtrl.push('OthersAccountPage',{
      othersUserName:this.userName
    })
  }
}
