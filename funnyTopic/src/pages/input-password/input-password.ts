import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Config } from "../../providers/config";
import { clientRequestService } from '../../providers/clientRequest';
import { ChatServiceClass } from '../../providers/chatService'
import { AlbumCameraProvider } from '../../providers/album-camera';
import { UserDataDBService } from '../../providers/user-data-db';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the InputPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-password',
  templateUrl: 'input-password.html',
})
export class InputPasswordPage {
  password:string;
  isPassword:boolean = false;
  userName:string; // User input mailbox.;
  code:string; //Verification code
  isANewUser:boolean = true; // Is it a new user;
  userInfo:any;
  userId:any;
  userAvatar:any;
  nickname:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private config : Config,
    private clientReq : clientRequestService,
    private userDataDB: UserDataDBService,
    private chatService: ChatServiceClass,
    private albumCamera: AlbumCameraProvider
  ) {
    this.code = navParams.get('code');
    this.userName = navParams.get('email');
    this.userAvatar = navParams.get('userAvatar');
    //this.userId = navParams.get('id');
    this.userId = window.localStorage.getItem('userId');
    this.nickname = navParams.get('nickname');
  }
  ionViewDidLoad() {
    // Determine whether verification code exists;Decide if it's a new user.
    this.isANewUser = this.code ? true : false;
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
    });

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
    if(this.isPassword){
      if(this.isANewUser){
        //新用户设置密码
        this.clientReq.requestData([{
          url:this.config.url+"user/updateUserInfo",
          params:[{password:this.password,token:this.userInfo.token,userId:this.userInfo.userId,userName:this.userInfo.username}],
          method:"GET"
        }],res => {
          if(res.state){
            window.localStorage.setItem('isLogin','true');
            let that = this;
            this.userDataDB.updateUserById('UPDATE users SET password=? WHERE userId=?;',[res.reason,this.userInfo.userId],()=>{

            })
            this.chatService.JMRegister({username: this.userInfo.email, password: res.reason}, (e) =>{

              that.chatService.JMLogin({username: that.userInfo.email, password: res.reason},()=>{

                  this.albumCamera.download(this.userAvatar,(res)=>{

                    this.chatService.updateMyAvatar({username:this.userInfo.email,imgPath:res.replace("file://", "")});

                  },(error)=>{

                  });

                  this.chatService.updateMyInfo({nickname:this.nickname,birthday:0,signature:"",gender:"unknown",region:"",address:""})
              });
            });
            this.navCtrl.setRoot(TabsPage)
          }
        },error =>{
          console.log(JSON.stringify(error));
        });
      }else{
        //老用户登录
        this.clientReq.requestData([{
          url:this.config.url+"user/login",
          params:[{userName:this.userName,password:this.password}],
          method:"GET"
        }],res => {
          if(res.state){
            let userInfo = {token:"",userId:'',username:'',password:'',email:''};
            userInfo.token = res.data.token;
            userInfo.userId = res.data.id;
            userInfo.username = res.data.userName;
            userInfo.password = res.data.password;
            userInfo.email = res.data.email;
            this.userDataDB.updateUserTable('UPDATE users SET token=?,password=? WHERE userId=?;',userInfo,() =>{
              window.localStorage.setItem('isLogin','true');
              window.localStorage.setItem('userId',userInfo.userId);
            });
            this.chatService.JMLogin({username: res.data.email, password: res.data.password},()=>{

            });
            this.navCtrl.setRoot(TabsPage)
          }else{
            this.showToast('middle','Password mistake');
          }
        },error =>{
          console.log(JSON.stringify(error));
        });
      }

    }
  }
  resetPass(){
    this.navCtrl.push('ResetPassPage',{
      email : this.userName
    });
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
