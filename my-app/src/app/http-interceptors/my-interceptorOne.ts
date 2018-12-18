import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class MyInterceptorOne implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    console.log(req,"--拦截器One");
    const newPar = req.body+'&address=上海市';
    const newReq = req.clone({  // 这里需要clone 而不能改变原始的请求
      body:newPar,
      //setHeaders: { Authorization: '123','Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    });
    return next.handle(newReq);
  }
}
