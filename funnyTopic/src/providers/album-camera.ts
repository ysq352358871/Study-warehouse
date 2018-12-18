
declare var JMessage:any;
import { ImagePicker  } from '@ionic-native/image-picker';
import { AndroidPermissions  } from '@ionic-native/android-permissions';
import { Injectable } from '@angular/core';
import { File} from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject }from'@ionic-native/file-transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Config } from "./config";
import { VideoEditor } from '@ionic-native/video-editor';
import { Media, MediaObject } from '@ionic-native/media';
/*
  Generated class for the AlbumCameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumCameraProvider {
  url:any;
  data: string = "";
  imageBase64 : Array<string>=[];

  // 图片上传的的api
  public uploadApi:string;

  constructor(
    private imagePicker: ImagePicker,
    private androidPermissions: AndroidPermissions,
    private transfer:FileTransfer,
    private file:File,
    private fileTransfer:FileTransferObject,
    private config: Config,
    private mediaCapture: MediaCapture,
    private camera: Camera,
    private videoEditor: VideoEditor,
    private media: Media
  ) {

  }
  upload: any= {
    fileKey: 'file',//接收图片时的key
    fileName: 'imageName.jpg',
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'//不加入 发生错误！！
    },
    params: {},
//需要额外上传的参数
    success: (data)=> { },//图片上传成功后的回调
    error: (err)=> { },//图片上传失败后的回调
    listen: ()=> { },//监听上传过程
    upVideo:false,
    upImg:false
  };
  getPicture(callback){
    this.data="";
    this.imageBase64=[];
    let options = {
      maximumImagesCount: 5,
      outputType: 0,
      quality: 100,
      width:800,
      height:800,
    };
    this.imagePicker.hasReadPermission().then(
      (result) =>{
        this.imagePicker.requestReadPermission().then(
        result =>{

          this.imagePicker.getPictures(options).then((results) => {
            callback(results);

          }, (err) => {
            alert("error");
          });},
        error => console.log(error)
      )} ,
      error => console.log(error)
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,this.androidPermissions.PERMISSION.MOUNT_UNMOUNT_FILESYSTEMS]).then(
      result => console.log("成功1"),
      err => console.log("123")
    );
  }

  // 上传图片
  uploadImg(path:string,imgObj?:any) {
    if (!path) {
      return;
    }
    let options:any = {
      fileKey: this.upload.fileKey,
      headers: this.upload.headers,
      params: this.upload.params
    };
    this.fileTransfer.upload(path,this.uploadApi, options)
      .then((data)=> {
        if (this.upload.success) {
          this.upload.success(JSON.parse(data.response),imgObj,"img");
        }
      },(err) => {
        if (this.upload.error) {
          this.upload.error(err);
        } else {
          console.log("错误!");
        }
      })

  }
  //上传视频
  uploadVideo(path:string) {
    if (!path) {
      return;
    }
    let options:any = {
      fileKey: 'file',
      fileName: 'name.mp4',  // 文件类型
      mimeType: "video/mpeg4",
      // headers: {
      //    "Content-Type": 'video/mpeg4'
      // },
      httpMethod:"POST",
      chunkedMode: false,
      params: {}
    };
    this.uploadProgress();
    this.fileTransfer.upload(path,this.config.url+"upload/file", options)
      .then((data)=> {
        if (this.upload.success) {
          this.upload.success(JSON.parse(data.response),"","video");
        }
      },(err) => {
        if (this.upload.error) {
          //this.upload.error(err);
        } else {
          console.log("错误!");
        }
      })

  }
// 停止上传
  stopUpload(){
    if (this.fileTransfer) {
      this.fileTransfer.abort();
    }
  }
  uploadProgress() {
    this.fileTransfer.onProgress(progressEvent => {
      if (progressEvent.lengthComputable) {
        // 下载过程会一直打印，完成的时候会显示 1
        console.log(progressEvent.loaded / progressEvent.total);
      } else {

      }
    });
  }


  getVideo(success,error){
    let options: CaptureImageOptions = { limit: 1};
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) =>{
          let file = data[0];
          let videoFileName = 'test';
          let options = {
            fileUri: file.fullPath,
            outputFileName: videoFileName,
            atTime: 2,
            width: 480,
            height: 480,
            quality: 100
          };
          this.videoEditor.createThumbnail(options).then((res) =>{
            success(data,res)
          },(error) =>{
            console.log(error);
          })
        },
        (err: CaptureError) => error(JSON.stringify(err))
      );
  }

  getCamera(success,error){
    let options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      destinationType: 1,
      // this.camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      sourceType:1,
      // this.camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: true,                                        //在选择之前允许修改截图
      encodingType:this.camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 800,                                        //照片宽度
      targetHeight: 800,                                       //照片高度
      mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      success(imageData)
    }, (err) => {
      // Handle error
      error(err)
    });
  }

  download(url,succes,err) {
    this.fileTransfer.download(url, this.file.dataDirectory + 'avatar.jpg').then((entry) => {

      succes(entry.toURL())
    }, (error) => {
      // handle error
      console.log('download complete 下载图片: ' + JSON.stringify(error));
      err(error);
    });
  }

  filePath:string;
  recordData : MediaObject;
  interval:any;
  record: any ={
    callback:(res)=>{

    }
  }

  /**
   * 开始录音开始
   * */
  start(){
    this.file.createFile(this.file.externalDataDirectory, new Date().getTime()+'.mp3', true).then(() => {
      this.recordData = this.media.create(this.file.externalDataDirectory.replace(/^file:\/\//, '') + new Date().getTime()+'.mp3');

      this.recordData.onStatusUpdate.subscribe(status => console.log(status,'----状态')); // fires when file status changes

      this.recordData.onSuccess.subscribe(() =>{
        console.log('Action is successful111');
        this.record.callback(this.recordData);
      });
      this.recordData.onError.subscribe(error => console.log('Error!', error));
      console.log(JSON.stringify(this.recordData));
      this.recordData.startRecord();

    });
    //开始录音
    //this.recordData.startRecord();
  }

  getTime(){
    let duration = this.recordData.getDuration();
    return duration;
  }
  stopRecord(callback){
    console.log(JSON.stringify(this.recordData),"-----停止录音");
    this.recordData.stopRecord();
    callback(this.recordData);
    this.release();
  }
  release(){ // 释放资源
    this.recordData.release();
  }
  pause(){
    this.recordData.pause();
  }
  play(){
    //this.getTime();
    this.recordData.play();
  }




  /**
   *聊天 播放语音
   * */
  chatRecordFile:MediaObject;
  element:any;
  anotherFile:MediaObject;
  playRecord(filePath,element){
    this.element = element;
    this.chatRecordFile = this.media.create(filePath);
    // to listen to plugin events:
    this.chatRecordFile.onStatusUpdate.subscribe(status =>{

    }); // fires when file status changes

    this.chatRecordFile.onSuccess.subscribe(() =>{
      console.log(JSON.stringify(this.chatRecordFile),'聊天播放语音12 Action is successful');
    });

    this.chatRecordFile.onError.subscribe(error => console.log('聊天播放语音 Error!', JSON.stringify(error)));
// play the file
    this.chatRecordFile.play();
  }
  chatRecordRelease(){
    this.chatRecordFile.release();
  }
  chatRecordStop(){
    this.chatRecordFile.stop();
    if(this.element){
      this.element.classList.remove("playAction");
    }
  }



}
