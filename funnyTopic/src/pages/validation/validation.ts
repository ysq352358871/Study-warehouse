import { Component,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatServiceClass } from '../../providers/chatService';

import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
/**
 * Generated class for the ValidationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-validation',
  templateUrl: 'validation.html',
})
export class ValidationPage {
  conversations:any = [];
  userInfo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatServiceClass,
    public changeDetectorRef:ChangeDetectorRef,
    private clientReq:clientRequestService,
    private config: Config,
  ) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.userInfo = this.navParams.get("userInfo");
    this.getConversations();
  }
  getConversations(){ // 获取会话列表
    this.chatService.getConversations((res)=>{
      this.conversations = res;
      //console.log(JSON.stringify(this.conversations),"------验证列表里获取消息");
      //在更改数据后不刷新的地方添加这两句话
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }
  send(userName,groupName,groupId,topicId,serveGroupId,applyUserId){
    this.chatService.sendTextMessage({ type:'single',text:'agree',username: userName,extras: {type:'addGroup',status:'agree',groupName:groupName}},(res)=>{
      console.log(JSON.stringify(res));
      this.agreeAddGroup(userName,groupId,topicId,serveGroupId,applyUserId)
    },(err)=>{
      console.log(JSON.stringify(err));
    })
  }

  agreeAddGroup(userName,groupId,topicId,serveGroupId,applyUserId){
    this.chatService.addGroupMembers({id: groupId, usernameArray: [userName]},(res)=>{
      this.clientReq.requestData([{url:this.config.url+'group/joinGroupChat',params:[{groupId:serveGroupId,token:this.userInfo.token,userId:this.userInfo.userId,topicId:topicId,memberId:applyUserId}],method:"GET"}],res =>{
        this.getConversations();
      },error =>{
        console.log(error,"请求出错了123");
      })
    },(err)=>{
      console.log(err,"----添加群成员失败")
    })
  }
  goValidationDetailPage(userName,groupName,groupId,topicId,serveGroupId,applyUserId,nickname,avatarThumbPath){
    this.navCtrl.push('ValidationDetailPage',{
      userInfo:this.userInfo,
      userName:userName,  //申请入群的用户的用户名
      groupName:groupName,
      groupId:groupId,
      topicId:topicId,
      serveGroupId:serveGroupId,
      applyUserId:applyUserId,
      nickname:nickname,
      avatarThumbPath:avatarThumbPath
    })
  }
}
