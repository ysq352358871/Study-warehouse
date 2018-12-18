import { Component, OnInit } from '@angular/core';
import { HttpTestSService } from "../service/http-test-s.service";
@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.css']
})
export class HttpTestComponent implements OnInit {

  constructor(private httpTestSService:HttpTestSService) { }
  name = 'patrick@zeusmobi.com';
  pass = '1234567890';



  loginByGet(){
    this.httpTestSService.loginByGet(this.name,this.pass)
      .subscribe((data)=> console.log(data,'By get'));
  }

  loginByPost(){
    this.httpTestSService.loginByPost({name:this.name,pass:this.pass})
      .subscribe(
        (data)=> console.log(data,"By Post"),
        error => console.log(error)
      );
  }

  ngOnInit() {
    //this.loginByGet();
    this.loginByPost();
  }

}
