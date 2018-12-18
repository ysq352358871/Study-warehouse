import { Component,ViewChild, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Content} from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  isScroll:boolean = false;
  selectKind:string;
  topicList:any = [];
  followedUser:any = [];
  fansList:any = [];
  userInfo:any = {};
  currentUserDataFromServe:any ={};
  page:number;
  size:number;
  userId:any;
  isFollow:boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
    public alertCtrl: AlertController,
    public changeDetectorRef:ChangeDetectorRef
  ) {

  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){

    this.selectKind = 'topic';
    this.page = 1;
    this.size = 10;
    this.userId = window.localStorage.getItem('userId');
    this.getCurrentUser();
  }
  getCurrentUser(){ //查询本地数据库;
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
      this.getPublisheredTopic();
      this.getCurrentUserFromServe();
    });
  }
  getCurrentUserFromServe(){
    this.clientReq.requestData([{url:this.config.url+"user/getUserByUserId",params:[{
      userId:this.userInfo.userId
    }],method:"GET"}],(res)=>{
      this.currentUserDataFromServe = res.data;
    },(err)=>{

    })
  }
  getPublisheredTopic(){ //获取用户发布的topic
    this.clientReq.requestData([{url:this.config.url+"topic/getMyTopic",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size
    }],method:"GET"}],(res)=>{
      this.topicList = res.data;
      for(let i=0;i<this.topicList.length;i++) {
        if(this.topicList[i]["picUrl"]){
          this.topicList[i]["picUrl"] = this.topicList[i]["picUrl"].split(",");
        }
      }
    },(err)=>{

    })
  }

  //获取用户关注的人
  getFollowedUser(){
    this.clientReq.requestData([{url:this.config.url+"user/getMyfollow",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size
    }],method:"GET"}],(res)=>{
      this.followedUser = res.data;
      for(let i=0;i<this.followedUser.length;i++){
        this.followedUser[i]['isFollow'] = true;
        this.followedUser[i]['isShow'] = true;
      }
    },(err)=>{

    })
  }
  cancelOrAddFollowed(params,type){
      if(type=='follow' || (type =='fans' && params.mutual ==1)){
        this.cancelAlert(params,type);
      }else if(type =='fans' && params.mutual ==0){
        this.clientReq.requestData([{url:this.config.url+"user/addFollow",params:[{
          publishId:params.id,userId:this.userInfo.userId,token:this.userInfo.token
        }],method:"GET"}],(res)=>{
          params.mutual = 1;
          this.currentUserDataFromServe.followingNum = this.currentUserDataFromServe.followingNum +1;

        },(err)=>{

        })
      }
  }
  cancelAlert(params,type){
    let confirm = this.alertCtrl.create({
      // title: 'Use this lightsaber?',
      message: 'Are you sure you want to cancel the user?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {

          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.clientReq.requestData([{url:this.config.url+"user/cancelFocus",params:[{
              userId:this.userInfo.userId,token:this.userInfo.token,focusId:params.id
            }],method:"GET"}],(res)=>{
              if(res.state){
                switch (type){
                  case 'follow':
                    params.isShow = false;
                    break;
                  case 'fans':
                    params.mutual = 0;
                    break;
                }
                this.currentUserDataFromServe.followingNum = this.currentUserDataFromServe.followingNum -1;
              }
            },(err)=>{

            })

          }
        }
      ]
    });
    confirm.present();
  }

  //获取自己的粉丝
  getMyFans(){
    this.clientReq.requestData([{url:this.config.url+"user/getMyFans",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size
    }],method:"GET"}],(res)=>{
      this.fansList = res.data;
      console.log(JSON.stringify(this.fansList),"---获取自己的粉丝")
    },(err)=>{

    })
  }

  @ViewChild(Content) content: Content;
  scrollHandler() {
    if(this.content.scrollTop >= 40){
        this.isScroll = true;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    }else {
      this.isScroll = false;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    }

  }

  goCenter(){
    this.navCtrl.push('AccountCenterPage');
  }
  goSetting(){
    this.navCtrl.push('AccountSettingPage',{
      userInfo:this.userInfo
    });
  }
}
