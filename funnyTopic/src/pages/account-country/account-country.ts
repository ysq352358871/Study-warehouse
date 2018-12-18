import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the AccountCountryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-country',
  templateUrl: 'account-country.html',
})
export class AccountCountryPage {
  userInfo:any = {};
  firstLetterArr:any= [];
  formatArr:any =[];
  country:string;
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
    this.userInfo = this.navParams.get('userInfo');
    this.country = this.navParams.get('country');
    this.getCountryList();
    this.firstLetterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  }
  getCountryList(){
    this.clientReq.requestData([{url:this.config.url+"country/queryCountry",params:[{}],method:"GET"}],(res)=>{
      //console.log(JSON.stringify(res),"----获取国家列表123");
      for(let j=0;j<this.firstLetterArr.length;j++){
        let obj = {};
        obj['key'] = this.firstLetterArr[j];
        obj['value'] = [];
        for(let i =0;i<res.data.length;i++){
          if(res.data[i].countryName.substring(0,1).toLowerCase() == this.firstLetterArr[j].toLowerCase()){
            obj['value'].push(res.data[i].countryName);
          }
        }
        this.formatArr.push(obj);
      }
    },(err)=>{

    })
  }

  go(el){
    let element = document.getElementById(el);
    if(element) {
      element.scrollIntoView();
    }
  }

  upUserServeCountry(data){
    if(data != this.country){
      this.clientReq.requestData([{url:this.config.url+"user/updateUserInfo",params:[{
        userId:this.userInfo.userId,
        token:this.userInfo.token,
        country:data
      }],method:"GET"}],(res)=>{
        if(res.state){
          this.upUserLocalCountry(data)
        }
      },(err)=>{

      })
    }

  }
  upUserLocalCountry(country){
    this.userDataDB.updateUserById('UPDATE users SET country=? WHERE userId=?;',[country,this.userInfo.userId],() =>{
      //this.back();
    });
  }

}
