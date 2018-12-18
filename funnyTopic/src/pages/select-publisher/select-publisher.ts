import $ from 'jquery';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { AlbumCameraProvider } from '../../providers/album-camera';
import { PublishPage } from '../publish/publish';
/**
 * Generated class for the SelectPublisherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-publisher',
  templateUrl: 'select-publisher.html',
})
export class SelectPublisherPage {
  photoOrVideoOpen:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private albumCamera:AlbumCameraProvider,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {

  }

  closeView(){
     this.viewCtrl.dismiss();
  }

  goPublisher(){
    this.navCtrl.push('PublishPage');
  }



  getPicture(){
    let that =this;
    this.albumCamera.getPicture(function (res) {

      if(res.length > 0){
        that.navCtrl.push(PublishPage,{
          img:res
        });
      }

    })
  }

  getPicOrVideo(){
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
            this.getVideo();
            break;
        }
      }
    });

    alertPhotoOrVideo.present().then(() => {
      this.photoOrVideoOpen = true;
    });
  }

  getCamera(){
    var that = this;
    this.albumCamera.getCamera( (res) => {
      let temporary:any =[];
      temporary.push(res);
      that.navCtrl.push(PublishPage,{
        img:temporary
      });
    },(err)=>{
      console.log(err);
    })
  }
  getVideo(){
    var that = this;
    this.albumCamera.getVideo((res,thumbnail) =>{
      let videoObj = { fileUrl:res[0].fullPath,thumbnail:thumbnail};
      let videoArr:any = [];
      videoArr.push(videoObj);
      that.navCtrl.push(PublishPage,{
        video:videoArr
      });
    },(error)=>{

    })
  }
}
