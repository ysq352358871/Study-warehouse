import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Config } from "../../providers/config";
import { clientRequestService } from '../../providers/clientRequest';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isEmail:boolean = false; //是否符合邮箱格式
  userName:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl:ToastController,
    private config :Config,
    public clientReq:clientRequestService
  ) {
  }

  ionViewDidLoad() {

  }
  // ionViewDidLeave(){
  //   this.navCtrl.setRoot(TabsPage)
  // }
  showToast(position: string,str: string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
  checkEmail(e:any){
    this.userName = e.target.value;
    let patt1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(patt1.test(this.userName)){
      this.isEmail = true;
    }
  }
  login(){
    if(this.isEmail){
      this.clientReq.requestData([{
        url:this.config.url+"user/getUserByUserName",
        params:[{userName:this.userName}],
        method:"GET"
      }],res => {
        if(res.count == 0){ //用户未注册
          this.navCtrl.push('InputCodePage',{
            email : this.userName
          });
        }else if(res.count > 0){
          this.navCtrl.push('InputPasswordPage',{
            email : this.userName
          });
        }
      },error =>{

      });

    }else {
      this.showToast('middle','Email format error');
    }
  }
}
