import $ from 'jquery';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { AlbumCameraProvider } from '../../providers/album-camera';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
import { ChatServiceClass } from '../../providers/chatService';
//import { Base64 } from '@ionic-native/base64';
/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {
  countryObj:any;
  initImgArr:any;
  topicTitle:string = ""; //topic 的标题
  isSend:boolean = false; // 是否可以发布topic
  data: string = "";
  imgArr:any[] = []; // 用于存放从相册获取的图片的路径
  videoArr:any[] = []; // 用于存放拍摄视频的的路径和缩略图
  categoryOpen: boolean;
  photoOrVideoOpen: boolean;
  category:string;
  userInfo:any;
  text:string;
  picUrl:string = "";
  loader:any;
  upVideo:boolean = false;
  upImg:boolean = false;
  //发布话题的参数

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
    public toastCtrl:ToastController,
    //private base64: Base64
  ) {
    this.initImgSer();

  }

  ionViewDidLoad() {
    this.countryObj=JSON.parse(window.localStorage.getItem('country'));
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+window.localStorage.getItem('userId'),(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
      console.log(JSON.stringify(res));
    });

    this.initImgArr = this.navParams.get('img');
    this.videoArr = this.navParams.get('video')?this.navParams.get('video'):[];
    if( this.initImgArr ){
      this.imgIntoHtml(this.initImgArr);
    }
    if(this.videoArr.length>0){
      this.videoIntoHtml(this.videoArr);
    }
  }
  back(){
    this.navCtrl.pop();
  }

  public imgIntoHtml(res:any):void{
    //let that =this;
    let obj= $("#textArea");
    for(let i = 0;i<res.length;i++){
      let imgObj:any = {id:"",fileUrl:""}; // 用于存放文件路径与img标签的父容器的id属性 的json对象
      // 给img标签的容器设置一个时间戳的Id属性，方便在添加话题时 替换img标签的src本地路径
      imgObj.id="Img"+new Date().getTime();
      imgObj.fileUrl = res[i]; // 文件路径
      this.imgArr.push(imgObj);
      let string = `<div class="uploadWrap" id="${imgObj.id}">
          <img src="${res[i]}" alt="" class="targetImg">
          </div>`;
      $(string).appendTo(obj);
      this.setSelection(obj); // 在往编辑区域插入html元素之后 调用此方法，是光标永远在最后。
    }
  }
  public videoIntoHtml(params){
    // 需要确定是不是只要一个 如果只需一个视频那么下面需要做判断
    let thumbnailObj ={id:"videoThumbnail",fileUrl:params[0].thumbnail};
    this.imgArr.push(thumbnailObj);
    let videoDemoHtml = `
    <div id="videoThumbnail">
        <img src="assets/imgs/Play@1.5x.svg" alt="" id="play">
        <img src="${params[0].thumbnail}" alt="" id="thumbnail">
    </div>`;
    let obj= $("#textArea");
    $(videoDemoHtml).appendTo(obj);
    this.setSelection(obj);
  }
  private initImgSer() { //处理图片上传的回调
    let index = 0;
    let arr:string[] = []; // 用于存储新的文件路径
    this.albumCamera.uploadApi = this.config.url+'upload/file';
    /*
    * dada: 本地图片上传成功之后返回的数据
    * imgObj: 上传图片时 携带过去的用于存储img 父容器的Id属性与img src本地路径的json对象,用于 与服务器传回的图片路径进行一一对应
    * **/
    this.albumCamera.upload.success= (data,imgObj,type)=> {  //成功回调
      index++;
      if(data.state){
        switch (type){
          case "video":
            this.videoArr[0].fileUrl = data.data;
            $("#video source").attr({"src":data.data});
            this.upVideo = true;
            break;
          case "img":
            imgObj['fileUrl'] = data.data;  // 把json对象里的本地文件路径换成服务器返回来的路径
            arr.push(imgObj);
            if(index === this.imgArr.length){//这儿判断图片是不是都上传过
              this.upImg = true;
              this.albumCamera.upload.upImg = true;
              for(let j=0;j<arr.length;j++){
                if(arr[j]["id"] == "videoThumbnail"){
                  this.videoArr[0].thumbnail = arr[j]['fileUrl'];
                  $("img#thumbnail").attr({"src":arr[j]['fileUrl']});
                  $("#video").attr({"poster":arr[j]['fileUrl']});
                }else{
                  this.picUrl = this.picUrl+arr[j]['fileUrl']+",";
                  $("#"+arr[j]['id']).find("img").attr({"src":arr[j]['fileUrl']}); // 通过时间戳Id 改变img的src的值
                }

              }
            }else{
              // 做上传失败处理
            }
            break;
        }
        if(this.videoArr.length >0){
          if(this.upVideo && this.upImg){
            this.addTopic();
          }
        }else if(this.upImg){
          this.addTopic();
        }

      }
    };
    this.albumCamera.upload.error= (err)=> {  // 上传出错回调
      console.log(JSON.stringify(err))
    };

  }

  setSelection(obj){
    if(window.getSelection) {//ie11 10 9 ff safari
      obj.focus().get(0); //解决ff不获取焦点无法定位问题
      var range = window.getSelection();//创建range
      range.selectAllChildren(obj.get(0));//range 选择obj下所有子内容
      range.collapseToEnd();//光标移至最后
    }
  }

  addTopic(){
    this.text=$("#textArea").html(); // 获取文本编辑区域的所有html元素及其结构
    this.clientReq.requestData([{  // 添加topic http请求
      url:this.config.url+"topic/releaseTopic",
      params:[{
        userId:this.userInfo.userId,
        userName:this.userInfo.username,
        token:this.userInfo.token,
        html:this.text,
        title:this.topicTitle,
        picUrl:this.picUrl.slice(0,-1),
        country:this.countryObj.shortName,
        category:this.category,
        previewImg:this.videoArr[0]?this.videoArr[0].thumbnail:"",
        video:this.videoArr[0]?this.videoArr[0].fileUrl:""
      }],
      method:"GET"
    }],(res) =>{
      this.loader.dismiss(); // 销毁loader
      console.log(JSON.stringify(res),"创建topic返回数据");
      //创建成功 就创建群组。
      if(res.state){
        this.chatService.createGroup({name: this.topicTitle, desc: this.userInfo.avatar},(groupId)=>{
          console.log(groupId,"群组Id");
          this.clientReq.requestData([{url:this.config.url+'group/createGroup',params:[{groupName:this.topicTitle,userId:this.userInfo.userId,token:this.userInfo.token,jmGroupId:groupId,topicId:res.reason}],method:"GET"}],res =>{
            console.log(JSON.stringify(res),"----创建服务器上的群组");
          },error =>{
            console.log(error,"创建服务器上的群组出错了");
          })
          this.chatService.createConversation({type: 'group',groupId:groupId})
        })
      }
    },(error) => console.log(error))
  }
  checkConOrSend(){
    if(!this.topicTitle.trim()){
      this.isSend = false;  // 用于判断send按钮是否可用
    }else {
      this.isSend = true;
    }
  }
  uploadImg(){ // 添加topic之前上传图片
    for(let i = 0;i<this.imgArr.length;i++){
      this.albumCamera.uploadImg(this.imgArr[i].fileUrl,this.imgArr[i]);
    }
  }
  selectCategory() {  //设置分类 设置完分类及：有图片上传图片 没图片 直接发布话题
    if(!this.topicTitle.trim()){
      return
    }
    let alert = this.alertCtrl.create();
    alert.setTitle('Category');
    alert.addInput({
      type: 'radio',
      label: 'Social',
      value: 'Social',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Entertainment',
      value: 'Entertainment'
    });
    alert.addInput({
      type: 'radio',
      label: 'Star',
      value: 'Star'
    });
    alert.addInput({
      type: 'radio',
      label: 'Movement',
      value: 'Movement'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.categoryOpen = false;
        this.category = data;
        this.presentLoading();
        if(this.imgArr.length > 0){ //存储图片的数组长度大于0 则先上传图片
          this.uploadImg();
          if(this.videoArr.length > 0){
            this.albumCamera.uploadVideo(this.videoArr[0].fileUrl);
          }
        }else{
           this.addTopic();
        }

      }
    });

    alert.present().then(() => {
      this.categoryOpen = true;
    });
  }
  presentLoading() { // 上传等待
    this.loader = this.loadingCtr.create({
      content: "Publishing..."
    });
    this.loader.present();
  }
  // 选择相机拍照 还是录制视频
  photoOrVideo(){
    let alertPhotoOrVideo = this.alertCtrl.create();
    alertPhotoOrVideo.setTitle('Choose');
    alertPhotoOrVideo.addInput({
      type: 'radio',
      label: 'Take a photo',
      value: 'photo',
      checked: true
    });
    alertPhotoOrVideo.addInput({
      type: 'radio',
      label: 'Shoot video',
      value: 'video'
    });
    alertPhotoOrVideo.addButton('Cancel');
    alertPhotoOrVideo.addButton({
      text: 'Ok',
      handler: data => {
        this.photoOrVideoOpen = false;
        //this.category = data;
        switch (data){
          case 'photo':
            this.getCamera();
            break;
          case 'video':
            if(this.videoArr.length >0){
              this.showToast('middle','You can only upload one video.');
              return;
            }
            this.getVideo();
            break;
        }
      }
    });

    alertPhotoOrVideo.present().then(() => {
      this.photoOrVideoOpen = true;
    });
  }


  getPicture(){ // 获取相册图片
    var that = this;
    this.albumCamera.getPicture(function (res) {
      that.imgIntoHtml(res)
    });

  }
  getVideo(){
    var that= this;
    this.albumCamera.getVideo( (res,thumbnail) => {
      let videoObj = { fileUrl:res[0].fullPath,thumbnail:thumbnail};
      that.videoArr.push(videoObj);
      that.videoIntoHtml(that.videoArr);
    },(err) =>{
      console.log(err);
    })
  }
  getCamera(){
    var that = this;
    this.albumCamera.getCamera( (res) => {
      let temporary:any =[];
      temporary.push(res);
      that.imgIntoHtml(temporary);
    },(err)=>{
      console.log(err);
    })
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
