import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';

/**
 * Generated class for the FocusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-focus',
  templateUrl: 'focus.html',
})
export class FocusPage {
  kind:string ;
  userId:any;
  userInfo:any;
  page:number;
  size:number;
  haveFollowedUser:any = [];
  search:string;
  topicList:any = [];
  items:any =[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.setItems();
    this.kind = "User";
    this.page = 1;
    this.size = 10;
    this.search = "";
    this.userId = window.localStorage.getItem('userId');
    this.getCurrentUser();
  }
  getFollowedUser(){
    this.clientReq.requestData([{url:this.config.url+"user/getMyfollow",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size,token:this.userInfo.token
    }],method:"GET"}],(res)=>{
        console.log(JSON.stringify(res),"----获取当前用户关注的用户");
        this.haveFollowedUser = res.data;
    },(err)=>{

    })
  }
  getCurrentUser(){ //查询本地数据库;
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
      console.log(JSON.stringify(res),"---focus 获取个人信息");
      this.getFollowedUser();
    });
  }
  PlacedAtTheTopOrCancel(params){
    let data;
    if(params.top == 0){
      params.top = 1;
      data= [{url:this.config.url+"user/userTop",params:[{
        followedUserId:params.id,userId:this.userInfo.userId,token:this.userInfo.token,top:1
      }],method:"GET"}]
    }else if(params.top = 1){
      params.top = 0;
      data= [{url:this.config.url+"user/userTop",params:[{
        followedUserId:params.id,userId:this.userInfo.userId,token:this.userInfo.token,top:0
      }],method:"GET"}]
    }
    this.clientReq.requestData(data,(res)=>{
      if(res.state = true){
        this.getFollowedUser();
      }
    },(err)=>{

    })
  }
  cancelFollow(params){
    console.log(JSON.stringify(params),"----取消关注的对象");
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
              console.log(JSON.stringify(res),"----取消关注");
              if(res.state){
                this.getFollowedUser();
              }
            },(err)=>{

            })
          }
        }
      ]
    });
    confirm.present();
  }
  getFollowedTopic(){ //获取关注的topic
    console.log(JSON.stringify({
      userId:this.userInfo.userId,page:this.page,size:this.size,token:this.userInfo.token
    }),"准备获取topic");
    this.clientReq.requestData([{url:this.config.url+"topic/getMyFocus",params:[{
      userId:this.userInfo.userId,page:this.page,size:this.size,token:this.userInfo.token
    }],method:"GET"}],(res)=>{
      console.log(JSON.stringify(res),"----获取当前用户关注的topic");
      this.topicList = res.data;
      for(let i=0;i<this.topicList.length;i++) {
        if(this.topicList[i]["picUrl"]){
          this.topicList[i]["picUrl"] = this.topicList[i]["picUrl"].split(",");
        }
      }
    },(err)=>{

    })
  }

  // getItems(ev) {
  //   // set val to the value of the ev target
  //   var val = ev.target.value;
  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.haveFollowedUser = this.haveFollowedUser.filter((item) => {
  //       return (item.nickName.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }


  setItems() {
    this.items = ['Orange', 'Banana', 'Pear', 'Tomato', 'Grape', 'Apple', 'Cherries', 'Cranberries', 'Raspberries', 'Strawberries', 'Watermelon'];
  }


  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }





}
