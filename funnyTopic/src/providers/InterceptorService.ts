/*
* 拦截器：
* 1、对请求头的设置，以及token处理
* 2、响应状态码等错误处理。
* **/

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

import { Observable} from 'rxjs/Observable';
@Injectable()
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

    const authToken = 'sadaa1545641axxx';
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // })
    const  authReq = req.clone({ // 这个是上面那个的快捷方式
      setHeaders : {Authorization: authToken}
    })
    console.log(req);
    return next.handle(authReq).pipe(mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status != 200) {
          return ErrorObservable.create(event);
        }
        return Observable.create(observer => observer.next(event)); //请求成功返回响应
      }),
      catchError((res: HttpResponse<any>) => {   //请求失败处理
        switch (res.status) {
          case 401:
            break;
          case 200:
            console.log('请求成功');
            break;
          case 404:
            console.log('页面找不到');
            break;
          case 403:
            console.log('业务错误');
            break;
        }
        return ErrorObservable.create(event);
      }));
  }
}
