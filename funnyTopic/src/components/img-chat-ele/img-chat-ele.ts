import { Component,Input} from '@angular/core';

/**
 * Generated class for the ImgChatEleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-chat-ele',
  templateUrl: 'img-chat-ele.html'
})
export class ImgChatEleComponent {
  constructor() {

  }
  @Input() data: any;
}
