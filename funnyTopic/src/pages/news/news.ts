declare var JMessage:any;
import { Component,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ChatServiceClass } from '../../providers/chatService';
import { UserDataDBService } from '../../providers/user-data-db';
//页面引入所需模块
import { ChangeDetectorRef } from '@angular/core';



/**
 * Generated class for the NewsPage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  conversations:any = [];
  userId:any;
  userInfo:any = {};
  date:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatServiceClass,
    private zone: NgZone,
    public changeDetectorRef:ChangeDetectorRef,
    private userDataDB: UserDataDBService,
  ) {

  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.getLocalUserInfo();
    this.getConversations();
    this.NewAddReceiveMessageListener();
    let myDate = new Date();
    let m=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
    let d = myDate.getDate();
    let y = myDate.getFullYear();
    this.date = y+"-"+m+"-"+d;
  }
  NewAddReceiveMessageListener(){
    JMessage.addReceiveMessageListener((msg)=>{
      //this.push(msg)
      //console.log(JSON.stringify(msg),"接收到消息了news");
      this.getConversations();
    });
  }

  getLocalUserInfo(){
    this.userId = window.localStorage.getItem('userId');
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
    });
  }


  goChat(id){
    this.navCtrl.push('ChatRoomTwoPage',{
      id:id
    });
  }

  getConversations(){ // 获取会话列表
    this.conversations = [];
      this.chatService.getConversations((res)=>{
          let index =0;
          for(let i =0;i<res.length;i++){
            if(res[i].conversationType == 'single' && res[i].latestMessage.extras.type == 'addGroup'){
              if(index <= 0){
                this.conversations.push(res[i]);
              }
              index = index +1;
            }else if(res[i].conversationType == 'group'){
              this.conversations.push(res[i]);
            }
          }
        //在更改数据后不刷新的地方添加这两句话
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      });
  }



  goValidationPage(){
    this.navCtrl.push('ValidationPage',{
      userInfo:this.userInfo
    });
  }
}
