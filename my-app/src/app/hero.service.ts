import { Injectable } from '@angular/core';
import { HEROES } from "./mock-heroes";
import { Hero} from "./hero";
import { MessageService } from "./message.service"

import { Observable } from "rxjs/Observable"
import { of } from "rxjs/observable/of";
@Injectable()
export class HeroService {

  constructor(private messageService:MessageService) { }

  getHeroes():Observable<Hero[]>{ // 返回的是一个可订阅的对象
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  }
}
