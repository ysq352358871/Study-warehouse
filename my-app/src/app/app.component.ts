import { Component, OnInit} from '@angular/core';
import { AdServiceService} from "./ad-service.service";
import {AdItem} from "./ad-item";
import { Observable} from "rxjs/Observable"

/**
 * of/map/filter 都为Rxjs下的操作符
 * */
import {of} from "rxjs/observable/of";
import {map} from "rxjs/operators";
import {filter} from "rxjs/operators";
import {pipe} from "rxjs/Rx";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes';
  testScript='Template <script>alert(\"evil never sleeps\")</script>Syntax'; // 为了去除危险 angular中禁止出现Script标签
  fontSizePx= 30;
  ads:AdItem[];
  constructor(public adServiceService:AdServiceService){

  }
  ngOnInit(){
    this.ads = this.adServiceService.getData();

    // 订阅
    function sequenceSubscriber(observer) {
      const seq = [1, 2, 3];
      let timeoutId;

      // Will run through an array of numbers, emitting one value
      // per second until it gets to the end of the array.
      function doSequence(arr, idx) {
        timeoutId = setTimeout(() => {
          observer.next(arr[idx]);
          if (idx === arr.length - 1) {
            observer.complete();
          } else {
            doSequence(arr, ++idx);
          }
        }, 1000);
      }

      doSequence(seq, 0);

      // Unsubscribe should clear the timeout to stop execution
      return {unsubscribe() {
        clearTimeout(timeoutId);
      }};
    }

// Create a new Observable that will deliver the above sequence
    const sequence = new Observable(sequenceSubscriber);
    /*sequence.subscribe({
      next(num) { console.log(num); },
      complete() { console.log('Finished sequence'); }
    });*/
    //Rxjs
    this.rxjsTest();


  }

  condition = false;
  changeCondition(){
    this.condition = !this.condition;
  }

  rxjsTest(){
      const num = of(1,2,3,4,5);//of 是把一些字符串数据静态的转成Observable类型
      /*const a = pipe(
        filter((n:number) => n % 2 !== 0),
        map(n=> n * n)
      )
      const b =a(num);
      b.subscribe(x => console.log(x,"------"))*/

      const c = of(6,7,8,9,10,11).pipe(   // pipe() 函数也同时是 RxJS 的 Observable 上的一个方法
        filter((n:number) => n % 2 !== 0), // 过滤
        map(n=> n * n) // 映射
      );
    c.subscribe(x => console.log(x,"!!!"))
  }

}
