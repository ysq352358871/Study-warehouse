import $ from 'jquery';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Events} from 'ionic-angular';
import { Config } from "../../providers/config";
import { clientRequestService } from '../../providers/clientRequest';
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the HotPage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hot',
  templateUrl: 'hot.html',
})
export class HotPage {
  page:number = 1;
  size:number = 10;
  categoryData:any =[];
  showMore:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    private clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService

    ) {
    events.subscribe('hotPage:dismiss', () => {
      this.viewCtrl.dismiss();
    });
  }

  ionViewDidLoad() {
    $("div.modal-wrapper").parent().addClass("hot");
  }
  ionViewDidEnter(){
    this.getCategory();
  }
  getCategory(arg?){
    this.clientReq.requestData([{url:this.config.url+'category/getCategory',params:[{page:this.page,size:this.size}],method:"GET"}],res =>{
      if(res.state){
          this.categoryData =res.data;
          if(arg){
            this.showMore = false;
          }else{
            this.showMore = true;
          }

      }
    },error =>{
      console.log(error,"请求出错了");
    })
  }
  getMore(){
    this.page = 1;
    this.size = 100;
    this.getCategory(true);
    this.showMore = false;
  }
  getTopicByCategory(arg:string){
    this.events.publish('home:getDataByCategory',arg);
  }

  closePage(){
    this.viewCtrl.dismiss();
    this.events.publish('hotPage:close');
  }
}
