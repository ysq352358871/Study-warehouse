import { Component,ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import { AlbumCameraProvider } from '../../providers/album-camera';
/**
 * Generated class for the RecordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'record',
  templateUrl: 'record.html'
})
export class RecordComponent {
  isRecording:boolean = false; //是否正在录音 用来控制文字以及按钮(试听录音、取消)的显示
  isAudition:boolean = false;// 是否触摸到试听按钮
  isCancel:boolean = false; //是否要触摸到取消按钮
  isPlayAudition:boolean = false; //是否要打开播放试听界面
  isStartPlayAudition:boolean = false; //是否开始播放录音;
  isPress:boolean = false; //是否长按了;
  recordTime:string = 'Long press to speak';
  fileTime:string = '00:00';
  timerDur:any; // 计时器对象 计算录音大小
  timerCountdown:any; // 计时器对象 计算录音大小
  minute:number=0; //文件的分钟数
  minute2:number=0; //文件的分钟数
  second:number=0; //文件的秒
  second2:number=0; //文件的秒
  constructor(
    public changeDetectorRef:ChangeDetectorRef,
    private albumCamera:AlbumCameraProvider,
  ) {
    //this.recordTime = 'Long press to speak';
  }
  ionViewDidEnter(){

  }
  @Output() onRecord = new EventEmitter<any>();

  vote(params:any) { //把数据交给父组件
    this.onRecord.emit(params);
  }



  getTime(){
    this.recordTime = "00:00";
    this.fileTime = "00:00";
    let temporaryMinute,temporarySecond;
    this.timerDur = setInterval(()=> {
      this.second++;
      if(this.second>60){
        this.minute++;
        this.second=0;
      }
      temporarySecond =this.second<10?"0"+this.second:this.second;
      temporaryMinute =this.minute<10?"0"+this.minute:this.minute;
      this.recordTime = temporaryMinute+":"+temporarySecond;
      this.fileTime = temporaryMinute+":"+temporarySecond;
    }, 1000);
  };
  countdown(){
    let temporaryMinute,temporarySecond;
    this.timerCountdown = setInterval(()=> {
      this.second2++;
      if(this.second2>60){
        this.minute2++;
        this.second2=0;
      }
      temporarySecond =this.second2<10?"0"+this.second2:this.second2;
      temporaryMinute =this.minute2<10?"0"+this.minute2:this.minute2;
      this.fileTime = temporaryMinute+":"+temporarySecond;
    }, 1000);
  }
  panEvent(e){
    this.check(e.center.x,e.center.y)
  }
  pressEvent(e){ //长按录音1111
    this.isRecording = true;
    this.isPress = true;
    this.minute =0; //时间初始化
    this.second = 0;
    this.albumCamera.start();
    this.getTime();
  }
  touchEndRecord(e){ //手指抬起事件;
    if(this.isPress){
      clearInterval(this.timerDur);
      this.recordTime = 'Long press to speak';
      this.albumCamera.stopRecord((res)=>{
        console.log(JSON.stringify(res),"----制完成发送录音文件回调1231111111");
        if(this.isAudition){
          this.isPlayAudition = true;
        }else if(!this.isAudition && !this.isCancel && this.isRecording){
          console.log(this.minute,this.second,"----录制完成发送录音文件了");
          this.vote({filePath:res._objectInstance.src,minute:this.minute,second:this.second});
        }

      });

      this.isRecording = false;
      this.isAudition = false;
      this.isCancel = false;
    }

  }
  check(x,y){
    if(this.isRecording){
      let audition = document.getElementById("audition");
      let cancelAudition = document.getElementById("cancelAudition");
      let auditionX= audition.getBoundingClientRect().left;
      let auditionY =audition.getBoundingClientRect().top;
      let auditionw = audition.offsetWidth;
      let auditionh = audition.offsetHeight;
      let cancelAuditionX= cancelAudition.getBoundingClientRect().left;
      let cancelAuditionY =cancelAudition.getBoundingClientRect().top;
      let cancelAuditionW = cancelAudition.offsetWidth;
      let cancelAuditionH = cancelAudition.offsetHeight;
      if((auditionX <= x && x<=auditionw+auditionX) && ( auditionY<= y && y <=auditionY+auditionh)){
        this.isAudition = true;
        this.minute2=0;
        this.second2=0;
      }else{
        this.isAudition = false;
      }
      if((cancelAuditionX <= x && x<=cancelAuditionW+cancelAuditionX) && ( cancelAuditionY<= y && y <=cancelAuditionY+cancelAuditionH)){
        this.isCancel = true;
      }else {
        this.isCancel = false;
      }
    }
  }

  playAudition(){
    let that = this;
    document.getElementById("playProgressLeft").addEventListener('animationend',function(){
      this.classList.remove('active');
      that.isStartPlayAudition = false;
      //that.fileTime = "00:00";
      that.minute2=0;
      that.second2=0;
      clearInterval(that.timerCountdown);
    });
    document.getElementById("playProgressRight").addEventListener('animationend',function(){
      this.classList.remove('active');
    });
      this.isStartPlayAudition = !this.isStartPlayAudition;
      let playProgressRight = document.getElementById("playProgressRight");
      let playProgressLeft = document.getElementById("playProgressLeft");
      if(this.isStartPlayAudition){
        playProgressRight.classList.remove("pause");
        playProgressLeft.classList.remove("pause");
        playProgressRight.classList.add("active");
        playProgressLeft.classList.add("active");
        playProgressRight.style.animationDuration = this.minute*60+this.second+"s";
        playProgressLeft.style.animationDuration = this.minute*60+this.second+"s";
        this.countdown();
        this.albumCamera.play();
      }else{
        clearInterval(that.timerCountdown);
        playProgressRight.classList.add("pause");
        playProgressLeft.classList.add("pause");
      }

  }

  cancelRecord(){
    this.isPlayAudition = false;
  }

  sendRecord(){
    console.log('发送录音了');
  }




}
