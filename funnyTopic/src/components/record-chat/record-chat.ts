import { Component, Input,ElementRef } from '@angular/core';
import { Events } from 'ionic-angular';
import { AlbumCameraProvider } from '../../providers/album-camera';
/**
 * Generated class for the RecordchatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'record-chat',
  templateUrl: 'record-chat.html'
})
export class RecordChatComponent {
  constructor(
    public events: Events,
    private albumCamera:AlbumCameraProvider,
    private elementRef: ElementRef
  ) {

  }
  @Input() data: any; // 创建属性 接收来自父组件的数据


  onPlayRecord(filePath,second,minute){
    let els = document.getElementsByClassName("playAction");
    for(let i =0;i<els.length;i++){
      els[i].classList.remove('playAction');
    }
    let el = this.elementRef.nativeElement.querySelector('.voiceAnimate');
    el.classList.add("playAction");
    if(this.albumCamera.chatRecordFile){
      this.albumCamera.chatRecordStop();
      this.albumCamera.chatRecordFile = null;
    }
    this.albumCamera.playRecord(filePath,el);
    this.clearAnimate(el,second,minute)
  }

  clearAnimate(el,second,minute){
    let time = second*1+minute*60;
    console.log(time);
      setTimeout(()=>{
        el.classList.remove('playAction');
      },time*1000);
  }

}
