import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  isSearchTopic:boolean = false;
  userId:any;
  userInfo:any ={};
  recordArr:any = [];
  page:number = 1;
  size:number = 10;
  topicList:any =[];
  countryObj:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    this.countryObj=JSON.parse(window.localStorage.getItem('country'));
    this.userId = window.localStorage.getItem('userId');
    this.getLocalUserData();
    this.getRecord();
    this.getHotWord();
  }

  getLocalUserData(){
    this.userDataDB.queryUserTable('SELECT * FROM users WHERE userId = '+this.userId,(res) =>{ // 查询数据库用户信息
      this.userInfo = res;
    });
  }
  getRecord(){
    this.userDataDB.queryDB({sql:'SELECT * FROM record WHERE userId = '+this.userId+' order by id desc'},(res)=>{
        this.recordArr = res;
    })
  }
  addRecordToLocal(text){
    this.userDataDB.insertIntoRecord('INSERT INTO record (recordText,userId) VALUES (?, ?);',[text,this.userId]);
  }
  deleteRecordById(id){
    this.userDataDB.deleteRecord('DELETE FROM record WHERE id=?;',[id],()=>{
      this.getRecord();
    })
  }
  deleteAllRecord(){
    this.userDataDB.deleteRecord('DELETE FROM record WHERE userId=?;',[this.userId],()=>{
      this.getRecord();
    })
  }


  searchTopic(e:any){
    let el = document.querySelector("input");
    el.onkeyup=(event)=>{
      if(event.keyCode==13){
        if(!e.target.value || !e.target.value.trim()){
          this.isSearchTopic = false;
          return
        }else {
          this.getTopicData(e.target.value);
          this.addRecordToLocal(e.target.value);
          this.isSearchTopic = true;
        }
      }
    }
  }
  onCancel(e){
    console.log("123");
  }
  // topic/searchTopic 8082  country category page size

  getTopicData(title){
    this.clientReq.requestData([{url:this.config.search+"topic/searchTopic",params:[{
      title:title,
      country:this.countryObj.shortName,
      page:this.page,
      size:this.size
    }],method:"GET"}],(res)=>{
      console.log(JSON.stringify(res),"----获取到搜索的topic");
      let arr = res.data;
      if(res.state){
        for(let i=0;i<arr.length;i++) {
          if(arr[i]["picUrl"]){
            arr[i]["picUrl"] = arr[i]["picUrl"].split(",");
          }
        }
        this.topicList = arr;
      }
    },(err)=>{
      console.log(JSON.stringify(err),"====搜索topic错误")
    })
  }
  searchByHotWordRecord(title){
    this.isSearchTopic = true;
    this.getTopicData(title)
  }







  goTopicDetail(id,publisherId){
    this.navCtrl.push('TopicDetailPage',{
      id:id,
      publisherId:publisherId
    });
  }

  goBack(e:any){
    if(e.target.className.indexOf("searchbar-search-icon")=== 0){
      this.navCtrl.pop();
    }
  }
  hotWord:any;
  getHotWord(){
    this.clientReq.requestData([{url:this.config.search+"topic/getHotSearchWord",params:[{
      country:this.countryObj.shortName
    }],method:"GET"}],(res)=>{
      console.log(JSON.stringify(res),"----获取搜索热词");
      if(res.state && res.data){
        this.hotWord = JSON.parse(res.data);
      }
    },(err)=>{
      console.log(JSON.stringify(err),"====获取热词错误")
    })
  }

}
