import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";
import { switchMap} from "rxjs/operator/switchMap";
import { Observable} from "rxjs/Observable";
import { Hero} from "../../../hero";
import { NavigationEnd, NavigationStart} from "@angular/router"
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  data:any;
  ngOnInit() {
    this.data=this.route.snapshot.paramMap.get('foo');
    //alert(this.data)
    let a = this.route.snapshot.paramMap.get('id');
    console.log(a,'----来自detail');
    console.log(this.route.snapshot.queryParamMap.get('bookname'));

    // 通过订阅来获取路由参数
    this.route.paramMap.subscribe((params:ParamMap)=>{
        console.log(params.get('id'),'---来自subscribe');
      console.log(this.route.snapshot.queryParamMap.get('bookname'),'---来自subscribe');
    });


    // 路由事件;
    this.router.events
      .subscribe((event) => {
          //console.log('NavigationEnd:111', event);

      });
  }

}
