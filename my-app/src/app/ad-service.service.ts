import { Injectable } from '@angular/core';
import { AdItem } from "./ad-item";
import { DynamicOneComponent} from "./dynamic-one/dynamic-one.component";
import { DynamicTwoComponent} from "./dynamic-two/dynamic-two.component"

@Injectable()
export class AdServiceService {

  constructor() { }

  getData():any{
    return [
      new AdItem(DynamicOneComponent,{a:'杨胜千',b:"yang sheng qian"}),
      new AdItem(DynamicOneComponent,{a:'郝转转',b:'hao zhuan zhuan'}),
      new AdItem(DynamicTwoComponent,{name:'路飞',text:'一个航海路上的理想家'}),
      new AdItem(DynamicTwoComponent,{name:'索隆',text:'一直跟随路飞的豪剑客'})
    ]
  }
}
