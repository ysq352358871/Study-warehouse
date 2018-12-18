import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Config } from "../../providers/config";
import { clientRequestService } from '../../providers/clientRequest';
import { User } from "../../providers/user";
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the InputCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-code',
  templateUrl: 'input-code.html',
})
export class InputCodePage {
  acceptCodeCon:string;
  isGetCode:boolean = false;  // 判断是否发送过验证码了 false: 没有发送过
  inter:any;  // setInterval 的返回值;
  accept:string; // 验证码
  email: string;
  token:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl:ToastController,
    private config : Config,
    private clientReq : clientRequestService,
    private userDataDB : UserDataDBService
  ) {
    this.email = navParams.get('email');
  }

  ionViewDidLoad() {
    this.acceptCodeCon = 'Access code'
  }
  public getCode(){
    if(!this.isGetCode){
      this.isGetCode = true;
      let timer = 60;
      let that = this;
      this.acceptCodeCon = 'Regain('+timer+'s)';
      this.inter=setInterval(function () {
        timer--;
        that.acceptCodeCon = 'Regain('+timer+'s)';
        if(timer<=0){
          clearInterval(that.inter);
          that.isGetCode = false;
          that.acceptCodeCon = 'Access code';
        }
      },1000);

      //请求接收邮件，验证码
      this.clientReq.requestData([{
        url:this.config.url+"email/sendEmail",
        params:[{userName:this.email,type:1}],
        method:"GET"
      }],res => {
        this.showToast('middle','Please check the email and enter the verification code.');
      },error =>{
        console.log(JSON.stringify(error));
      });
    }else {
      this.showToast('middle','The verification code has been sent.');
    }
  }

  public sendCode(){
    if(!this.accept){
      this.showToast('middle','Please enter the verification code.');
      return;
    }
    // 发送验证码到服务器
    this.clientReq.requestData([{
      url:this.config.url+"email/verifyCode",
      params:[{email:this.email,code:this.accept,type:1}],
      method:"GET"
    }],res => {
      if(res.state){
        console.log(JSON.stringify(res),"input Code 返回值123");
        let userInfo = {userId:"",username:"",email:"",token:"",userAvatar:"",nickName:""};
        userInfo.userId = JSON.parse(res.data).id;
        userInfo.username = JSON.parse(res.data).userName;
        userInfo.email = JSON.parse(res.data).email;
        userInfo.token = JSON.parse(res.data).token;
        userInfo.userAvatar = JSON.parse(res.data).userAvatar;
        userInfo.nickName = JSON.parse(res.data).nickName;
        window.localStorage.setItem('userId',userInfo.userId);
        this.token=JSON.parse(res.data).token;
        this.userDataDB.insertIntoUserTable(userInfo);
        this.navCtrl.push('InputPasswordPage',{
            code: this.accept,
            id:userInfo.userId,
            userAvatar:userInfo.userAvatar,
            nickname:userInfo.nickName
        });
      }

    },error =>{
      console.log(JSON.stringify(error));
    });
  }


  showToast(position: string,str: string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}
