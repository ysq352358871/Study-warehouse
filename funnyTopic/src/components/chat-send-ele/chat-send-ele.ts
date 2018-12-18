import { Component, Input } from '@angular/core';
import { AdComponent }      from '../dataInterface';
@Component({
  selector: 'chat-send-ele',
  templateUrl: 'chat-send-ele.html'
})
export class ChatSendEleComponent implements AdComponent { // 使用implements 实现类接口 进行数据检查
  @Input() data: any; // 创建属性 接收来自父组件的数据

}
