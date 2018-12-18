declare var JMessage:any;
import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, ViewContainerRef,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';

import { AdComponent } from '../../components/dataInterface';
import { ChatEleComponent } from '../../components/chat-ele/chat-ele';
import { ChatSendEleComponent } from '../../components/chat-send-ele/chat-send-ele';
import { RecordChatComponent } from '../../components/record-chat/record-chat';
import { ImgChatEleComponent } from '../../components/img-chat-ele/img-chat-ele';
import { Content } from 'ionic-angular';
import { ChatServiceClass } from '../../providers/chatService';
import { UserDataDBService } from '../../providers/user-data-db';
import { AlbumCameraProvider } from '../../providers/album-camera'

/**
 * Generated class for the ChatRoomTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room-two',
  templateUrl: 'chat-room-two.html',
})
export class ChatRoomTwoPage {
  interval:any;
  sendCon:string = "";
  sendBtn: any;
  kind:string = "";
  code:any = "&#x1f62c;";
  id:any; //聊天对象的唯一标识符：username/groupId;
  userId:any;
  userInfo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private componentFactoryResolver: ComponentFactoryResolver,
    private chatService: ChatServiceClass,
    public changeDetectorRef:ChangeDetectorRef,
    private userDataDB: UserDataDBService,
    private albumCamera:AlbumCameraProvider,
    private events: Events
    ){

  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    //this.NewAddReceiveMessageListener();
     this.id = this.navParams.get('id');
    this.resetUnreadMessageCount();//重置消息未读数;
    this.getHistoryMessages();//获取历史消息;
    this.userId = window.localStorage.getItem('userId');
    this.events.subscribe('chat:chatRoomTwo', (msg) => {
      console.log('WelcomeTwoPage',JSON.stringify(msg));
      if(this.id == msg.target.id && msg.target.type == 'group'){
          //this.push()
        switch (msg.type){
          case 'text':
            this.push({text:msg.text,avatarThumbPath:msg.from.avatarThumbPath,nickname:msg.from.nickname},ChatEleComponent);
            break;
          case 'voice':
            this.push({filePath:msg.path,minute:msg.extras.minute,second:msg.extras.second,avatarThumbPath:msg.from.avatarThumbPath,flag:true,
              nickname:msg.from.nickname
            },RecordChatComponent);
            break;
          case "image":
            this.push({imgPath:msg.thumbPath,avatarThumbPath:msg.from.avatarThumbPath,flag:true,
              nickname:msg.from.nickname
            },ImgChatEleComponent);
            break;
        }
        this.resetUnreadMessageCount();
      }
    });
  }
  ionViewDidLeave(){
    if(this.albumCamera.chatRecordFile){
      this.albumCamera.chatRecordRelease();
    }
  }
  go(e){
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  goChatDetail(){
    this.navCtrl.push('ChatDetailPage');
  }
  clearKind(e:any){
    this.kind = "";
  }
  @ViewChild(Content) content: Content;
  scrollToBottom() {
    this.content.scrollToBottom();
  }
  goScroll(){
    this.scrollToBottom();
  }


  ngOnInit() {}
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  checkConOrSend(e){
    this.sendBtn = document.querySelector('#sendBtn');
    if(!this.sendCon.trim()){
      this.sendBtn.classList.remove("active");
      return
    }else {
      this.sendBtn.classList.add("active");
    }
    if(e.code === "Enter"){
      this.sendMessage();
    }

  }

  sendMessage(){
    if(!this.sendCon){
      return;
    }
    this.chatService.sendTextMessage({ type: 'group', groupId: this.id, text: this.sendCon},(res) =>{
      console.log(JSON.stringify(res),"----发送文本消息成功1")
    },(error)=>{
      console.log(JSON.stringify(error),"发送文本消息失败");
    });
    this.push({text:this.sendCon,avatarThumbPath:this.userInfo.avatar},ChatSendEleComponent);
    this.sendCon ='';
    this.sendBtn.classList.remove("active");
  }


//重置未读消息
  resetUnreadMessageCount(){
    //console.log("调用重置未读消息");
    this.chatService.resetUnreadMessageCount(this.id);
  }

  //获取历史消息
  getHistoryMessages(){
    this.chatService.getHistoryMessages({ type: 'group', groupId: this.id, from: 0, limit: 10 },(res) =>{
      this.getCurrentUser(()=>{
        for(let i=res.length-1;i>=0;i--){
          if(res[i].from.username === this.userInfo.username){
            switch (res[i].type){
              case "text":
                this.push({text:res[i].text,avatarThumbPath:res[i].from.avatarThumbPath,nickname:res[i].from.nickname},ChatSendEleComponent);
                break;
              case "voice":
              this.push({filePath:res[i].path,minute:res[i].extras.minute,second:res[i].extras.second,avatarThumbPath:res[i].from.avatarThumbPath,flag:false,
                nickname:res[i].from.nickname
              },RecordChatComponent);
              break;
              case "image":
                this.push({imgPath:res[i].thumbPath,avatarThumbPath:res[i].from.avatarThumbPath,flag:false,
                  nickname:res[i].from.nickname
                },ImgChatEleComponent);
                break;
            }
          }else {
            switch (res[i].type){
              case "text":
                this.push({text:res[i].text,avatarThumbPath:res[i].from.avatarThumbPath,nickname:res[i].from.nickname},ChatEleComponent);
                break;
              case "voice":
                this.push({filePath:res[i].path,minute:res[i].extras.minute,second:res[i].extras.second,avatarThumbPath:res[i].from.avatarThumbPath,flag:true,
                  nickname:res[i].from.nickname
                },RecordChatComponent);
                break;
              case "image":
                this.push({imgPath:res[i].thumbPath,avatarThumbPath:res[i].from.avatarThumbPath,flag:true,
                  nickname:res[i].from.nickname
                },ImgChatEleComponent);
                break;
            }
          }
        }
      });

    },(error) =>{
      console.log(JSON.stringify(error),"------获取历史消息错误")
    })
  }

  getCurrentUser(callback){ //查询本地数据库;
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
      console.log(JSON.stringify(this.userInfo),"----当前用户");
      callback();
    });
  }


  push(msg,element){ //把消息push到页面上
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(element);
    // this.container.clear();
    let componentRef = this.container.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = msg;
    //在更改数据后不刷新的地方添加这两句话
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }
  /**
   * onRecord:子组件(录音)发射的事件,带过来一些参数：文件路径与时间等。
   * */
  onRecord(params) {
    console.log(JSON.stringify(params),"------来自录音组件的数据1");
    // 把消息push到页面上
    this.push({filePath:params.filePath,minute:params.minute,second:params.second,avatarThumbPath:this.userInfo.avatar,flag:false},RecordChatComponent);
    //通过极光发送消息
    this.chatService.sendVoiceMessage({ type: 'group', groupId: this.id, path: params.filePath, extras: {second: params.second,minute:params.minute}},
      (res)=>{
        console.log(JSON.stringify(res),"=====发送语音消息成功")
      },(err)=>{
        console.log(JSON.stringify(err),"=====发送语音消息失败")
      })
  }

  // 调起相册，获取图册，并发送图片消息
  getPicture(){
    this.albumCamera.getPicture((res)=>{
      for(let i =0;i<res.length;i++){
      //发送图片消息
        this.push({imgPath:res[i],avatarThumbPath:this.userInfo.avatar,nickname:this.userInfo.nickname,flag:false},ImgChatEleComponent);
        this.chatService.sendImageMessage({type: 'group', groupId: this.id, path: res[i]},(res)=>{
          // do something
        },(err)=>{
          //console.log(err);
        });
      }
    })
  }
  // 调用相册拍照 并发送
  getCamera(){
    this.albumCamera.getCamera((res)=>{
      if(res){
        this.push({imgPath:res,avatarThumbPath:this.userInfo.avatar,nickname:this.userInfo.nickname,flag:false},ImgChatEleComponent);
        this.chatService.sendImageMessage({type: 'group', groupId: this.id, path: res},(res)=>{

          // do something
        },(err)=>{
          //console.log(err);
        });
      }
    },(err)=>{

    })
  }
}
