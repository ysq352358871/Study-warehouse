import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
import { ChatServiceClass } from '../../providers/chatService'
/**
 * Generated class for the AccountCareerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-career',
  templateUrl: 'account-career.html',
})
export class AccountCareerPage {
  sendCon:string;
  isSend:boolean;
  type:string;
  userInfo:any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq: clientRequestService,
    private config: Config,
    private userDataDB : UserDataDBService,
    private chatService: ChatServiceClass
  ) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.sendCon = "";
    this.isSend = false;
    this.type = this.navParams.get("type");
    this.userInfo = this.navParams.get("userInfo");
  }
  check(){
   if(this.sendCon.trim()){
     this.isSend = true;
   }
  }
  updateDate(){
    if(this.sendCon.trim() != ''){
      switch(this.type){
        case "Nickname":
          this.updateServeUserData('nickName',[{
            userId:this.userInfo.userId,
            token:this.userInfo.token,
            nickName:this.sendCon
          }]);
          break;
        case "Industry":
          this.updateServeUserData('userIndustry',[{
            userId:this.userInfo.userId,
            token:this.userInfo.token,
            userIndustry:this.sendCon
          }]);
          break;
        case "Career":
          this.updateServeUserData('userCareer',[{
            userId:this.userInfo.userId,
            token:this.userInfo.token,
            userCareer:this.sendCon
          }]);
          break;
      }
    }
  }

  updateServeUserData(field,data){
    this.clientReq.requestData([{url:this.config.url+"user/updateUserInfo",params:data,method:"GET"}],(res)=>{
      if(res.state){
        this.updateLocalUserData(field,[this.sendCon,this.userInfo.userId]);
        if(field == 'nickName'){
          this.chatService.updateMyInfo({nickname:this.sendCon,birthday:0,signature:"",gender:"unknown",region:"",address:""})
        }
      }
    },(err)=>{

    })
  }
  updateLocalUserData(field,userInfo){
    this.userDataDB.updateUserById('UPDATE users SET '+field+'=? WHERE userId=?;',userInfo,() =>{
        this.back();
    });
  }

  back(){
    this.navCtrl.pop();
  }
}
