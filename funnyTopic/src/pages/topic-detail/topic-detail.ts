import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, ViewContainerRef,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatServiceClass } from '../../providers/chatService';
import { ToastController } from 'ionic-angular';
//import $ from 'jquery';
/**
 * Generated class for the TopicDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topic-detail',
  templateUrl: 'topic-detail.html',
})
export class TopicDetailPage implements OnDestroy,OnInit {
  chatRoom: any;
  chatRoomWrap:any;
  isFollow:boolean = false; // 关注用户
  isFocus:boolean = false; // 关注topic
  isGroupMember:boolean = false;
  id:any; //topic的id;
  publisherId:any; //topic发布者的id;
  topicDetailData:any = {};
  comments:any = [];
  userInfo:any;
  userId:any;
  commentPage:number = 1;
  commentSize:number = 4;
  jmGroupId:any; // 群组id
  topicId:number;
  title:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatServiceClass,
    public modalCtrl: ModalController,
    private clientReq: clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
    public changeDetectorRef:ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public toastCtrl: ToastController
  ) {

  }
  //@ViewChild('tempMessage') tempMessage: ElementRef;

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.id = this.navParams.get('id');
    this.publisherId =  this.navParams.get('publisherId');
    if(window.localStorage.getItem('isLogin')){
      this.userId = window.localStorage.getItem('userId');
      this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
        this.userInfo = res;
        console.log(JSON.stringify(res),"---topicDetail 查询数据库");
        this.getDetail();
        this.getComments();
      });
    }else {
      this.getDetail();
      this.getComments();
    }
  }


  ngOnInit() {}
  ngOnDestroy() {

  }
  openModal() {
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
    }else if(!this.isGroupMember){
        console.log("发送加群请求123");
        this.chatService.getGroupInfo({id: this.jmGroupId},(res)=>{
          console.log(JSON.stringify(res),"----获取群组信息");
          this.chatService.sendTextMessage({ type: 'single', username: res.owner,
            text: 'hello', extras: {type: 'addGroup',groupId:this.jmGroupId,topicId:this.topicId,serveGroupId:this.topicDetailData.groupId,applyUserId:this.userId,groupName:this.title}},(res)=>{
            console.log(JSON.stringify(res),"---发送了文本消息成功");
            this.showToast('bottom');
          },(error) =>{
            console.log(JSON.stringify(error),"---发送了文本消息失败");
          })
        },(err)=>{

        })

    }else{
      this.chatService.createConversation({ type: 'group', groupId: this.jmGroupId});
      let modal = this.modalCtrl.create('ChatRoomPage',{
        animation:'',
        jmGroupId:this.jmGroupId,
        title:this.title
      });
      modal.present();
    }

  }

  addFocus(){ // 关注话题
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
      window.localStorage.setItem('page','TopicDetailPage');
      return;
    }
    if(!this.isFocus){
      this.clientReq.requestData([{url:this.config.url+'topic/addFollow',params:[{topicId:this.id,userId:this.userInfo.userId,publishId:this.publisherId,token:this.userInfo.token}],method:"GET"}],res =>{
        console.log(JSON.stringify(res),"----topic添加关注1");
        if(res.state){
          //  这里要做一个友情提示
          this.isFocus = true;
        }
      },error =>{
        console.log(error,"请求出错了123");
      })
    }
  }
  addFollow(){ // 关注发布者
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
      window.localStorage.setItem('page','TopicDetailPage');
      return;
    }
    if(!this.isFollow){
      this.clientReq.requestData([{url:this.config.url+'user/addFollow',params:[{publishId:this.publisherId,userId:this.userInfo.userId,token:this.userInfo.token}],method:"GET"}],res =>{
        if(res.state){
          //  这里要做一个友情提示
          this.isFollow = true;
        }
      },error =>{
        console.log(error,"关注用户发布者请求出错了");
      })
    }

  }
  getDetail(){
    this.clientReq.requestData([{url:this.config.url+'topic/getTopicDetail',params:[{topicId:this.id,publishId:this.publisherId,userId:this.userInfo?this.userInfo.userId:""}],method:"GET"}],res =>{
      console.log(JSON.stringify(res),"----topic详情数据哈哈");
      this.topicDetailData = res.data[0];
      this.jmGroupId = this.topicDetailData.jmGroupId;
      this.isGroupMember = this.topicDetailData.isMember == 0?false:true;
      this.topicId = this.topicDetailData.id;
      this.title = this.topicDetailData.title;
      if(this.topicDetailData.topicFollow == 0){
        this.isFocus = false;
      }else if(this.topicDetailData.topicFollow > 0){
        this.isFocus = true;
      }
      if(this.topicDetailData.userFollow == 0){
        this.isFollow = false;
      }else if(this.topicDetailData.userFollow > 0){
        this.isFollow = true;
      }
      this.topicDetailData.html = this.sanitizer.bypassSecurityTrustHtml(this.topicDetailData.html);
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    },error =>{
      console.log(error,"请求出错了123");
    })
  }
  getComments(){
    this.clientReq.requestData([{url:this.config.url+'comment/getComment',params:[{topicId:this.id,userId:this.userInfo?this.userInfo.userId:"",page:this.commentPage,size:this.commentSize}],method:"GET"}],res =>{
      this.comments = res.data;
    },error =>{
      console.log(error,"请求出错了1");
    })
  }
  addGood(params){ //点赞;
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
      window.localStorage.setItem('page','TopicDetailPage');
      return;
    }
    if(params.isZan == 0){
      params.isZan = 1;
      params.zanNum = params.zanNum + 1;
      console.log(JSON.stringify([{commentId:params.id,userId:this.userInfo.userId,token:this.userInfo.token}]),"----点赞参数");
      this.clientReq.requestData([{url:this.config.url+'comment/addZan',params:[{commentId:params.id,userId:this.userInfo.userId,token:this.userInfo.token}],method:"GET"}],res =>{
      },error =>{
        console.log(error,"请求出错了1");
      })
    }
  }

  goWriteComment(){
    if(!window.localStorage.getItem('isLogin')){
      this.navCtrl.push('LoginPage');
      window.localStorage.setItem('page','TopicDetailPage');
      return;
    }
    this.navCtrl.push('WriteCommentPage',{
      topicId:this.id,
      userId:this.userInfo.userId,
      token:this.userInfo.token
    });
  }

  //申请入群消息提示框
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      cssClass:'applyIntoGroup toast-ios',
      message: 'Request to send success, waiting for the group manager for review',
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

}
