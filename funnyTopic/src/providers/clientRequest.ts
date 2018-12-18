/*
* 客户端数据请求的服务：对app数据请求接口进行统一整理
* declare let cordova: any; 引入cordova插件,设置变量。
* **/
declare let cordova: any;

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse,HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {catchError, retry, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Network } from "@ionic-native/network";
import { LoadingController } from 'ionic-angular';
@Injectable()
export class clientRequestService {

  constructor(
    private http: HttpClient,
    private netWork: Network,
    private loadingCtr: LoadingController,
    ) {

  }

  requestData(params,success,error){
    this.checkNetwork();
    /**
     * 参数params是一个JSonArray;
     * eg: [{url:'xxxx',params:[{name:"zhang",sex:"man"}],method:"GET"}];
     * */
    cordova.plugins.topicRequest.HttpRequest(params,res =>{
      success(JSON.parse(res))
      //return res;
    },error=>{
      //alert(error);
      console.log(JSON.stringify(error),"请求错误1");
      error(JSON.parse(error),"请求错误2")
    })
  }


  uploadFile(params,success,error){
    cordova.plugins.topicRequest.uploadFile(params,res =>{
      success(res)
      //return res;
    },error=>{
      //alert(error);
      console.log(error);
      error(JSON.parse(error))
    })
  }

  getCountry(){
    let url = 'http://maps.google.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true';
    return this.http.get(url).pipe(
      catchError(this.handleError('getHeroes', []))
    );

  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(JSON.stringify(error),"=----请求出错了"); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // 检查网络
  checkNetwork() {
    console.log(this.netWork);
    if(this.netWork.type === 'unknown') {
      console.log('This is a unknown network, please be careful!');
    } else if(this.netWork.type === 'none') {
      console.log('none network!');
      let loader = this.loadingCtr.create({
        content: "当前网络不可用，请检查网络设置！"
      });
      loader.present();
    } else {
      console.log('we got a b' + this.netWork.type + ' connection, woohoo!');
    }
  }
}
