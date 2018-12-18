import {Injectable} from '@angular/core';
@Injectable()
export class Config {
  url: string = "http://192.168.6.7:8080/";
  //url: string = "http://192.168.6.16:8083/";
  search:string = "http://192.168.6.7:8082/";
  constructor() {
  }

}
