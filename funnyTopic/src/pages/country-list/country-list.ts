import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { clientRequestService } from '../../providers/clientRequest';
import { Config } from "../../providers/config";
import { UserDataDBService } from '../../providers/user-data-db';
/**
 * Generated class for the CountryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country-list',
  templateUrl: 'country-list.html',
})
export class CountryListPage {
  isSearch:boolean = false;
  firstLetterArr:any= [];
  formatArr:any =[];
  searchArr:any = [];
  countryObj:any ={};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientReq:clientRequestService,
    private config: Config,
    private userDataDB: UserDataDBService,
  ) {

  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.countryObj = JSON.parse(window.localStorage.getItem('country'));
    this.getCountryList();
    this.firstLetterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  }
  getCountryItems(e){
    this.getFilterData();
    let val = e.target.value;
    if(!e.target.value || !e.target.value.trim()){
      this.isSearch = false;
      return
    }else {
      if (val && val.trim() !== '') {
        this.searchArr = this.searchArr.filter(function(item) {
          return item.countryName.toLowerCase().includes(val.toLowerCase());
        });
      }
      this.isSearch = true;
    }

  }


  getCountryList(){
    this.clientReq.requestData([{url:this.config.url+"country/queryCountry",params:[{}],method:"GET"}],(res)=>{
      for(let j=0;j<this.firstLetterArr.length;j++){
        let obj = {};
        obj['key'] = this.firstLetterArr[j];
        obj['value'] = [];
        for(let i =0;i<res.data.length;i++){
          let obj2 = {};
          if(res.data[i].countryName.substring(0,1).toLowerCase() == this.firstLetterArr[j].toLowerCase()){
            obj2['countryName'] =res.data[i].countryName;
            obj2['countryCode'] =res.data[i].countryCode;
            obj['value'].push(obj2);
          }
        }
        this.formatArr.push(obj);
      }
      this.getFilterData();
    },(err)=>{

    })
  }

  go(el){
    let element = document.getElementById(el);
    if(element) {
      element.scrollIntoView();
    }
  }

  getFilterData(){
    //this.searchArr = this.formatArr;
    for(let i=0;i<this.formatArr.length;i++){
      for(let j=0;j<this.formatArr[i].value.length;j++){
        this.searchArr.push(this.formatArr[i].value[j]);
      }
    }
  }

  onCancel(e){
    console.log(e,"取消了123");
  }
  selectPositionCountry(countryName,countryCode){
    window.localStorage.setItem('country',JSON.stringify({shortName:countryCode,longName:countryName}));
    this.navCtrl.pop();
  }
}
