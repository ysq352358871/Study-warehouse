import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
import { ChatServiceClass } from '../../providers/chatService'
/**
 * Generated class for the ResetPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-pass',
  templateUrl: 'reset-pass.html',
})
export class ResetPassPage {
  acceptCodeCon:string;
  isGetCode:boolean = false;
  inter:any;
  password:string;
  code:string;
  isPassword:boolean = false;
  userName:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
    private chatService: ChatServiceClass
  ) {
    this.userName = navParams.get('email');
  }

  ionViewDidLoad() {
    this.acceptCodeCon = 'Access code';
  }
  getCode(){
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
      },1000)

      //请求接收邮件，验证码
      this.clientReq.requestData([{
        url:this.config.url+"email/sendEmail",
        params:[{userName:this.userName,type:2}],
        method:"GET"
      }],res => {
        this.showToast('middle','Please check the email and enter the verification code.');
      },error =>{
        console.log(JSON.stringify(error));
      });



    }else {
      this.showToast('middle','The verification code has been sent');
    }
  }

  checkPass(e:any){
    this.password=e.target.value;
    let pat =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if(pat.test(this.password)){
      this.isPassword = true;
    }
  }
  check(){
    if(!this.isPassword){
      this.showToast('middle','Incorrect password format');
    }
  }

  login(){
    if(this.isPassword && this.acceptCodeCon){
      this.clientReq.requestData([{
        url:this.config.url+"user/resetPassword",
        params:[{userName:this.userName,password:this.password,code:this.code}],
        method:"GET"
      }],res => {
        if(res.state){
            this.chatService.JMLogin({username: this.userName, password: res.data.oldPassword},()=>{
              this.chatService.updateMyPassword({oldPwd: res.data.oldPassword, newPwd: res.data.newPassword});
            })
          this.navCtrl.pop();
        }else{
          this.showToast('middle',res.reason);
        }
      },error =>{
        //console.log(JSON.stringify(error));
      });
    }
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
