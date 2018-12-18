import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from "@angular/common/http";
import { HttpTestInterface } from "./http-test-interface";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import { of} from "rxjs/observable/of"
@Injectable()
export class HttpTestSService {

  constructor(private http:HttpClient) { }


  httpOptions = { //请求头配置
    headers: new HttpHeaders({
      //'Content-Type':  'application/json',
      'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8',
      //authorization: '123'
    }),

  }

  loginUrl = 'http://dashboard.zeusmobi.com/account/userLogin';
  loginByGet(name:string,pass:string){
      return this.http.get(`${this.loginUrl}?name=${name}&pass=${pass}`)
        .pipe(
          catchError(this.handlerError('BY Get',"出错了"))
        );
  }
  loginByPost(param:HttpTestInterface){
    let body = `name=${param.name}&pass=${param.pass}`;
    return this.http.post(this.loginUrl,body,this.httpOptions)
  }


  /**
   * 错误处理函数
   * */
  private handlerError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`,operation);
      }
      //this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
