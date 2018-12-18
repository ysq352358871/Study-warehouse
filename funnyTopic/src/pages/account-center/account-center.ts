import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AlbumCameraProvider } from '../../providers/album-camera';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
import { ChatServiceClass } from '../../providers/chatService';
/**
 * Generated class for the AccountCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-center',
  templateUrl: 'account-center.html',
})
export class AccountCenterPage {
  id:any; //获取本地存储的当前登录用户的Id
  userInfo:any = {};
  userData:any = {};
  loader:any;
  localImg:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private albumCamera:AlbumCameraProvider,
    private clientReq: clientRequestService,
    private config: Config,
    private userDataDB : UserDataDBService,
    private loadingCtr: LoadingController,
    private chatService: ChatServiceClass,
  ) {
    this.initImgSer()
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.id = window.localStorage.getItem('userId');
    this.getUserDataFromLocal();
  }

  private initImgSer() { //处理图片上传的回调
    this.albumCamera.uploadApi = this.config.url+'upload/file';
    this.albumCamera.upload.success= (data,imgObj,type)=> {  //成功回调
      this.updateServeUserData("avatar",[{
        userId:this.id,
        token:this.userInfo.token,
        userAvatar:data.data
      }])


    };
    this.albumCamera.upload.error= (err)=> {  // 上传出错回调
      console.log(JSON.stringify(err));

    };

  }




  getUserDataFromLocal(){
      this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.id,(res) =>{ // 查询数据库用户信息
        this.userInfo = res;
        this.getUserDataFromServe();
      });
    }
  getUserDataFromServe(){
    this.clientReq.requestData([{url:this.config.url+"user/getUserByUserId",params:[{
      userId:this.id,
      token:this.userInfo.token
    }],method:"GET"}],(res)=>{
      this.userData = res.data;
    },(err)=>{

    })
  }

  updateAvatar(){
    this.albumCamera.getPicture((res)=>{
      if(res.length >0){
        this.presentLoading();
        this.albumCamera.uploadImg(res[0]); //上传图片到阿里云服务器
        this.localImg = res[0];
        //更新极光的头像
        this.chatService.updateMyAvatar({imgPath:this.localImg.replace("file://", "")});
        //
      }
    })
  }
  updateGender(){
    let alert = this.alertCtrl.create({
      cssClass:'updateGender',
    });
    alert.setTitle('Gender');
    alert.addInput({
      type: 'radio',
      label: 'Male',
      value: '1',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Female',
      value: '0',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.updateServeUserData("sex",[{
          userId:this.id,
          token:this.userInfo.token,
          sex:data
        }])
      }
    });
    alert.present();
  }
  goUpdateCareerNameIndustry(type){
    this.navCtrl.push('AccountCareerPage',{
      type:type,
      userInfo:this.userInfo
    });
  }
  updateServeUserData(filed,data){
    this.clientReq.requestData([{url:this.config.url+"user/updateUserInfo",params:data,method:"GET"}],(res)=>{
      if(res.state){
        switch (filed){
          case 'sex':
            this.userData.sex = data[0].sex;
            this.updateLocalUserData(filed,[data[0].sex, this.id]);
            break;
          case 'avatar':
            this.loader.dismiss(); // 销毁loader
            this.userData.userAvatar = this.localImg;
            this.updateLocalUserData(filed,[data[0].userAvatar, this.id]);
            break;
        }
      }
    },(err)=>{

    })
  }
  updateLocalUserData(filed,userInfo){
    this.userDataDB.updateUserById('UPDATE users SET '+filed+'=? WHERE userId=?;',userInfo,() =>{

    });
  }
  updateCountry(){
    this.navCtrl.push('AccountCountryPage',{
      userInfo:this.userInfo,
      country:this.userData.country
    })
  }

  presentLoading() { // 上传等待
    this.loader = this.loadingCtr.create({
      content: "Uploading..."
    });
    this.loader.present();

  }

}
