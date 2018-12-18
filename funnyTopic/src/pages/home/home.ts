import $ from 'jquery';
 //declare let device: any;
import { Component,ElementRef} from '@angular/core';
import { IonicPage, NavController,Platform,ModalController,Events} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Config } from "../../providers/config";
import { clientRequestService } from '../../providers/clientRequest';
import { UserDataDBService } from '../../providers/user-data-db';
import { DataProvider } from '../../providers/db';
import { HttpClient, HttpResponse, HttpErrorResponse,HttpHeaders, HttpParams} from '@angular/common/http';
 @IonicPage()
 @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  s = document.querySelector('#hotMenu');
  hot:any;
  conEle:any;
  url:string = "http://192.168.6.4:8080/user/";
  page:number =1;
  size:number = 5;
  topicList:any = [];
  isOpen:boolean = false;
  isHot:boolean = false;
  isLatest:boolean = false;
  isGetByCategory:boolean = false;
  category:string;
  countryObj:any;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
    private db: DataProvider,
    private modalCtrl: ModalController,
    public events: Events,
    private http:HttpClient,
    private elementRef: ElementRef
  ) {
    this.countryObj = {longName:"",shortName:""};
    events.subscribe('hotPage:close', () => {
      let divEle = this.elementRef.nativeElement.querySelector('#hot');
      divEle.classList.remove("segment-activated");
      this.isOpen = false;
    });
    events.subscribe('home:getDataByCategory', (category) => {
      this.isHot = false;
      this.isLatest = false;
      this.isGetByCategory = true;
      this.page =1;
      this.size = 5;
      this.category = category;
      this.getDataByCategory([{url:this.config.search+"topic/searchTopic",params:[{
        country:this.countryObj.shortName,
        page:this.page,
        size:this.size,
        category:category
      }],method:"GET"}],"","")
    });
  }
  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.countryObj=JSON.parse(window.localStorage.getItem('country'));
      this.getTopicListByHot();
    });
    //this.getTopicListByHot();
    //this.getCountry();
  }
  closeHot(){
    let divEle = this.elementRef.nativeElement.querySelector('#hot');
    if(this.isOpen){
      this.isOpen = false;
      //divEle.classList.remove("segment-activated");
      this.events.publish('hotPage:dismiss');
    }
  }
  openModal() {
    let divEle = this.elementRef.nativeElement.querySelector('#hot');
    if(!this.isOpen){
      divEle.classList.add("segment-activated");
      this.isOpen = true;
      let modal = this.modalCtrl.create('HotPage');
      modal.present();
    }else{
      this.isOpen = false;
      //divEle.classList.remove("segment-activated");
      this.events.publish('hotPage:dismiss');
    }

  }
  goTopicDetail(id,publisherId){ // id: topic的id;publisherId:topic发布者的id;
    this.navCtrl.push('TopicDetailPage',{
      id:id,
      publisherId:publisherId
    });
  }
  goSearch(){
    this.closeHot();
    this.navCtrl.push('SearchPage');
  }
  goCountryList(){
    this.closeHot();
    this.navCtrl.push('CountryListPage');
  }

  requestLatest(arg?,type?){ //获取最新topic列表
    this.isOpen = false;
    this.isHot = false;
    this.isGetByCategory = false;
    this.isLatest = true;
    this.page=1;
    this.size=5;
    this.events.publish('hotPage:dismiss'); //发射事件给hot页面 进行注销页面
    this.getDataHttp([{url:this.config.url+'topic/getRecentTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],arg,type);
  }

  getTopicListByHot(arg?,type?){ // 请求hot topic数据
    this.isHot = true;
    this.isLatest = false;
    this.isGetByCategory = false;
    this.page=1;
    if(this.db.callback.topicIsReady){
      this.getDataHttp([{url:this.config.url+'topic/getHotTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],arg,type)
    }else{
      this.db.callback.success = (res) =>{
        this.getDataHttp([{url:this.config.url+'topic/getHotTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],arg,type)
      }
    }

  }



  refresh(refresher){
    this.page = 1;
    if(this.isHot){
      this.getDataHttp([{url:this.config.url+'topic/getHotTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],refresher);
    }else if(this.isLatest){
      this.getDataHttp([{url:this.config.url+'topic/getRecentTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],refresher);
    }else if(this.isGetByCategory){
      this.getDataByCategory([{url:this.config.search+"topic/searchTopic",params:[{
        country:this.countryObj.shortName,
        page:this.page,
        size:this.size,
        category:this.category
      }],method:"GET"}],refresher,"")
    }
  }
  doInfinite(infiniteScroll){
    this.page++;
    if(this.isHot){
      this.getDataHttp([{url:this.config.url+'topic/getHotTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],infiniteScroll,"infinite");
    }else if(this.isLatest){
      this.getDataHttp([{url:this.config.url+'topic/getRecentTopic',params:[{country:this.countryObj.shortName,page:this.page,size:this.size}],method:"GET"}],infiniteScroll,"infinite");
    }else if(this.isGetByCategory){
      this.getDataByCategory([{url:this.config.search+"topic/searchTopic",params:[{
        country:this.countryObj.shortName,
        page:this.page,
        size:this.size,
        category:this.category
      }],method:"GET"}],infiniteScroll,"infinite")
    }
  }
  getDataHttp(params,arg?,type?){
    this.clientReq.requestData(params,res =>{
      //console.log(JSON.stringify(res),"------获取列表页数据123");
      let arr= res.data;
      if(res.state){
        for(let i=0;i<arr.length;i++) {
           if(arr[i]["picUrl"]){
             arr[i]["picUrl"] = arr[i]["picUrl"].split(",");
           }
        }
        if(type == "infinite"){
           //console.log(JSON.stringify(res),"------加载的页数"+this.page);
          this.topicList.push.apply(this.topicList,arr);
          // 这儿 还需要当数据count小于pageSize时 进行友情提示。
        }else{
          this.topicList=arr;
        }
        this.dataInsertDB(res);
        // console.log(JSON.stringify(this.topicList),"获取topic列表123456z");
      }else{
        this.selectDb();  // 还需要对数据进行处理
      }
      if(arg){
        arg.complete();
      }
    },error =>{
      console.log(error,"请求出错了123");
    })
  }

  getDataByCategory(params,arg,type){
    this.clientReq.requestData(params,(res)=>{
      console.log(JSON.stringify(res),"----获取到通过分类得数据123");
      let arr = res.data;
      if(res.state){
        for(let i=0;i<arr.length;i++) {
          if(arr[i]["picUrl"]){
            arr[i]["picUrl"] = arr[i]["picUrl"].split(",");
          }
        }
        if(type == "infinite"){
          //console.log(JSON.stringify(res),"------加载的页数"+this.page);
          this.topicList.push.apply(this.topicList,arr);
          // 这儿 还需要当数据count小于pageSize时 进行友情提示。
        }else{
          this.topicList=arr;
        }
        this.dataInsertDB(res);
      }else{
        this.selectDb();  // 还需要对数据进行处理
      }
      if(arg){
        arg.complete();
      }
    },(err)=>{
      console.log(JSON.stringify(err),"====搜索topic错误")
    })
  }

//进行本地存储
  dataInsertDB(res){
    let sql = 'INSERT INTO topic (topicId,title,html,text,picUrl,video,previewImg,createTime,country,hot,category,chatNum,collectionNum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    let option;
    for(let i=0;i<res.length;i++){
      //this.topicList[i]["picUrl"] = this.topicList[i]["picUrl"].split(",");
      option = [
        res.data[i].id,
        res.data[i].title,
        res.data[i].html?res.data[i].html:'',
        res.data[i].text?res.data[i].text.trim():'',
        res.data[i].picUrl?res.data[i].picUrl:'',
        res.data[i].video?res.data[i].video:'',
        res.data[i].previewImg?res.data[i].previewImg:'',
        res.data[i].createTime,
        res.data[i].country?res.data[i].country:'',
        res.data[i].hot?res.data.hot[i]:0,
        res.data[i].category?res.data[i].category:'',
        res.data[i].chatNum?res.data[i].chatNum:0,
        res.data[i].collectionNum?res.data[i].collectionNum:0
      ];
      this.userDataDB.insertIntoDB({sql:sql,option:option},(res)=>{
        //console.log(i);
      })
    }
  }
  //查询本地数据库
  selectDb(){
    this.userDataDB.queryDB({sql:'SELECT * FROM topic;'},(res) =>{
      this.topicList = res;
    })
  }




}
