import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
/**
 * Generated class for the AccountFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-feedback',
  templateUrl: 'account-feedback.html',
})
export class AccountFeedbackPage {
  feedBackCon:string;
  isSend:boolean = false;
  userInfo:any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private clientReq:clientRequestService,
    private config: Config
  ) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.feedBackCon = "";
    this.userInfo = this.navParams.get('userInfo');
  }
  addFeedback(){
    if(this.isSend){
      this.clientReq.requestData([{url:this.config.url+"feedback/addFeedback",params:[{
        userId:this.userInfo.userId,
        text:this.feedBackCon,
        token:this.userInfo.token
      }],method:"GET"}],(res)=>{
        if(res.state){
          this.showToast('middle','We have received your feedback.thank you');
        }
      },(err)=>{
      })
    }else{
      this.showToast('middle','The feedback cannot be empty.');
    }
  }

  check(){
    if(this.feedBackCon.trim()){
      this.isSend = true;
    }else {
      this.isSend = false;
    }
  }
  back(){
    this.navCtrl.pop();
  }

  showToast(position:string,str: string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}
