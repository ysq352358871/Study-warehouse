import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
import { ChatServiceClass } from '../../providers/chatService'
/**
 * Generated class for the AccountUpdatePassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-update-pass',
  templateUrl: 'account-update-pass.html',
})
export class AccountUpdatePassPage {
  userInfo:any = {};
  oldPass:string;
  newPass:string;
  isOldPass:boolean = false;
  isNewPass:boolean = false;
  isSend:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
    private chatService: ChatServiceClass
    ) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.oldPass = "";
    this.newPass = "";
    this.userInfo = this.navParams.get('userInfo');
  }
  checkPass(e:any){
    let pat =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if(pat.test(this.oldPass)){
      this.isOldPass = true;
    }else{
      this.isOldPass = false;
    }
    if(pat.test(this.newPass)){
      this.isNewPass = true;
    }else{
      this.isNewPass = false;
    }
    if(this.isOldPass && this.isNewPass){
      this.isSend = true;
    }else{
      this.isSend = false;
    }
  }
  check(type){
    switch (type){
      case 'old':
        if(!this.isOldPass && this.oldPass != ""){
          this.showToast('middle','The old password you entered is incorrect.');
        }
        break;
      case 'new':
        if(!this.newPass && this.newPass != ""){
          this.showToast('middle','The new password is not in the correct format.');
        }
        break;
    }
  }

  updatePass(){
    if(this.isOldPass && this.newPass){
      this.clientReq.requestData([{url:this.config.url+"user/updatePassword",params:[{
        userId:this.userInfo.userId,
        token:this.userInfo.token,
        oldPassword:this.oldPass,
        newPassword:this.newPass,
        userName:this.userInfo.username
      }],method:"GET"}],(res)=>{
          if(res.state){
            this.chatService.updateMyPassword({oldPwd: res.data.oldPassword, newPwd: res.data.newPassword});
            this.userDataDB.updateUserById('UPDATE users SET password=? WHERE userId=?;',[res.data.newPassword,this.userInfo.userId],()=>{
                this.navCtrl.push('LoginPage');
            })
          }else {
            this.showToast('middle',res.reason);
          }
      },(err)=>{

      })




    }

  }

  back(){
    this.navCtrl.pop()
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
