import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
/**
 * Generated class for the WriteCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-write-comment',
  templateUrl: 'write-comment.html',
})
export class WriteCommentPage {
  isSend:boolean = false;
  topicComment:string = "";//评论内容;
  userId:number;
  token:string;
  topicId:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq: clientRequestService,
    private config: Config,
    public toastCtrl:ToastController
  ) {
    this.topicId = navParams.get("topicId");
    this.token = navParams.get("token");
    this.userId = navParams.get("userId");
  }

  ionViewDidLoad() {

  }
  checkConOrSend(){
    if(!this.topicComment.trim()){
      this.isSend = false;
    }else {
      this.isSend = true;
    }
  }
  back(){
    this.navCtrl.pop();
  }
  showToast(position: string,str: string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  addComments(){
    if(this.isSend){
      this.clientReq.requestData([{url:this.config.url+'comment/writeComment',params:[{topicId:this.topicId,text:this.topicComment,userId:this.userId,token:this.token}],method:"GET"}],res =>{
        if(res.state){
          this.showToast('middle','Add comment successfully');
        }else{
          this.showToast('middle',res.reason);
        }
      },error =>{
        console.log(error,"请求出错了1");
      })
    }
  }
}
