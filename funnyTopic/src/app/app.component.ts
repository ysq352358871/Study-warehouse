declare var JMessage:any;
import $ from 'jquery';
import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController, Events} from 'ionic-angular';

import { clientRequestService } from '../providers/clientRequest';
import { DataProvider } from "../providers/db";
import { ChatServiceClass } from '../providers/chatService'
import { UserDataDBService } from '../providers/user-data-db';
import { Config } from "../providers/config";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'TabsPage';
  public s:any;
  public hotEle:any;
  public conEle:any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    //private loadingCtr: LoadingController,
    private clientReq: clientRequestService,
    private db : DataProvider,
   // private deleDB:DeleteDBProvider,
    public modalCtrl: ModalController,
    private chatService: ChatServiceClass,
    private userDataDB: UserDataDBService,
    //public navCtrl: NavController,
    private events: Events,
    private config: Config,
  ) {
    platform.ready().then(() => {
      this.getLocalCountry();
      (<any>window).navigator.splashscreen.hide();
      statusBar.styleDefault();
      //splashScreen.hide();
      splashScreen.hide();
      this.NewAddReceiveMessageListener();
      this.selectPublisher();
      //初始化数据库
      this.db.initDatabase(()=>{
        if(window.localStorage.getItem('isLogin')){ // 如果用户登录处于登录状态 还需要去登录极光
          this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+window.localStorage.getItem('userId'),(res)=>{
            //console.log(JSON.stringify(res),"app启动查询用户1");
            this.chatService.JMLogin({username: res.email, password: res.password},()=>{

            })
          })
        }
      });
      //this.deleDB.deleteDB();
      // 初始化插件
      JMessage.init({ isOpenMessageRoaming: true });
      //JMessage.setDebugMode(true);
    });
  }
  NewAddReceiveMessageListener(){
    JMessage.addReceiveMessageListener((msg)=>{
      //this.push(msg)
      //console.log(JSON.stringify(msg),"接收到消息了");
      this.events.publish('chat:chatRoomTwo', msg);
      this.events.publish('chat:chatRoom', msg);
    });
  }

  selectPublisher(){
    let that = this;
    $("#tab-t0-2").on("click",function () {
      that.openModal();
    })
  }
  openModal() {
    let modal = this.modalCtrl.create('SelectPublisherPage');
    modal.present();
    // this.navCtrl.push(SelectPublisherPage)
  }


  getLocalCountry(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((res)=>{
        let latitude = res.coords.latitude;//纬度
        let longitude = res.coords.longitude;//经度
        //position/getCountry  lat lng
        this.clientReq.requestData([{
          url:this.config.url+"position/getCountry",
          params:[{lat:latitude+"",lng:longitude+""}],
          method:"GET"
        }],res => {
          window.localStorage.setItem('country',JSON.stringify({shortName:res.data.short_name,longName:res.data.long_name}));
        },error =>{

        });
      },(err)=>{
        console.log(JSON.stringify(err),"===错误");
      });
    }else{
      alert("浏览器不支持地理定位。");
    }
  }



}
