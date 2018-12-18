import { Component,ViewChild, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Content} from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the OthersAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-others-account',
  templateUrl: 'others-account.html',
})
export class OthersAccountPage {
  othersUserName:string;
  isScroll:boolean = false;
  selectKind:string;
  topicList:any = [];
  followedUser:any = [];
  fansList:any = [];
  userInfo:any = {};
  othersUserDataFromServe:any ={};
  page:number;
  size:number;
  userId:any;
  isFollow:boolean = true;
  otherUserId:any;
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
    this.othersUserName = this.navParams.get('othersUserName');
    this.selectKind = 'topic';
    this.page = 1;
    this.size = 1000;
    this.userId = window.localStorage.getItem('userId');
    this.getCurrentUser();
  }

  getCurrentUser(){ //查询本地数据库;
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
      this.getOthersUserFromServe();
    });
  }

  getOthersUserFromServe(){
    this.clientReq.requestData([{url:this.config.url+"user/getUserDetailByUserName",params:[{
      userId:this.userInfo.userId,
      userName:this.othersUserName
    }],method:"GET"}],(res)=>{
      this.othersUserDataFromServe = res.data;
      this.otherUserId = res.data.id;
      console.log(JSON.stringify(res),"---获取其他用户的数据");
      this.getPublisheredTopic();
    },(err)=>{

    })
  }
  getPublisheredTopic(){ //获取用户发布的topic
    this.clientReq.requestData([{url:this.config.url+"topic/getMyTopic",params:[{
      userId:this.otherUserId,page:this.page,size:this.size
    }],method:"GET"}],(res)=>{
      this.topicList = res.data;
      for(let i=0;i<this.topicList.length;i++) {
        if(this.topicList[i]["picUrl"]){
          this.topicList[i]["picUrl"] = this.topicList[i]["picUrl"].split(",");
        }
      }
      //在更改数据后不刷新的地方添加这两句话
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    },(err)=>{

    })
  }

  //获取用户关注的人
  //
  getFollowedUser(){
    this.clientReq.requestData([{url:this.config.url+"user/getMyfollow",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size,viewId:this.otherUserId
    }],method:"GET"}],(res)=>{
      this.followedUser = res.data;
      for(let i=0;i<this.followedUser.length;i++){
        this.followedUser[i]['isFollow'] = this.followedUser[i].isFocus*1 == 1?true:false;
        this.followedUser[i]['isShow'] = true;
      }
      //在更改数据后不刷新的地方添加这两句话
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    },(err)=>{

    })
  }
  cancelOrAddFollowed(params,type){
    if((type=='follow' && params.isFocus*1 == 1) || (type =='fans' && params.mutual ==1)){
      this.cancelAlert(params,type);
    }else{
      this.clientReq.requestData([{url:this.config.url+"user/addFollow",params:[{
        publishId:params.id,userId:this.userInfo.userId,token:this.userInfo.token
      }],method:"GET"}],(res)=>{
        switch (type){
          case 'follow':
            params.isFollow =true;
            break;
          case 'fans':
            params.mutual = 1;
            break;
        }
        //this.othersUserDataFromServe.followingNum = this.othersUserDataFromServe.followingNum +1;
//在更改数据后不刷新的地方添加这两句话
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
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
                    params.isFollow = false;
                    params.isFocus = 0;
                    break;
                  case 'fans':
                    params.mutual = 0;
                    break;
                }
                //this.othersUserDataFromServe.followingNum = this.othersUserDataFromServe.followingNum -1;
              }
            },(err)=>{

            })

          }
        }
      ]
    });
    confirm.present();
  }

  //获取粉丝
  getMyFans(){
    this.clientReq.requestData([{url:this.config.url+"user/getMyFans",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size,viewId:this.otherUserId
    }],method:"GET"}],(res)=>{
      this.fansList = res.data;
      console.log(JSON.stringify(this.fansList),"----获取用户的粉丝");
      //在更改数据后不刷新的地方添加这两句话
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
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




}
