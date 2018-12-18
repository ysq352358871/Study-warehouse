import { Component, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatServiceClass } from '../../providers/chatService';
/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {
  isGroupOwner:boolean = false;
  groupId:number;
  memberList:any = [];
  count:number;
  userName:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatServiceClass,
    public changeDetectorRef:ChangeDetectorRef
  ) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.groupId = this.navParams.get('groupId');
    this.userName = this.navParams.get('userName');
    this.getGroupMembers();
    this.getGroupInfo();
  }
  //获取群成员列表
  getGroupMembers(){
    this.chatService.getGroupMembers(this.groupId,(res)=>{
      this.memberList = res;
      this.count = this.memberList.length;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    },(err)=>{
      console.log(err);
    })
  }
  getGroupInfo(){
    this.chatService.getGroupInfo({id:this.groupId},(res)=>{
      if(res.owner == this.userName){
        this.isGroupOwner = true;
      }else{
        this.isGroupOwner = false;
      }
    },(err)=>{

    })
  }






  goMemberList() {
    this.navCtrl.push('MemberListPage');
  }
  goChatContentList() {
    this.navCtrl.push('ChatContentListPage');
  }
}
