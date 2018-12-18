import { NgModule } from '@angular/core';
import { ChatContainerComponent } from './chat-container/chat-container';
import { ChatEleComponent } from './chat-ele/chat-ele';
import { ChatSendEleComponent } from './chat-send-ele/chat-send-ele';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';

import {IonicModule} from "ionic-angular";
import { RecordComponent } from './record/record';
import { RecordChatComponent } from './record-chat/record-chat';
import { ImgChatEleComponent } from './img-chat-ele/img-chat-ele';

@NgModule({
	declarations: [
	  ChatContainerComponent,
    ChatEleComponent,
    ChatSendEleComponent,
    EmojiPickerComponent,
    RecordComponent,
    RecordChatComponent,
    ImgChatEleComponent
    ],
	imports: [IonicModule], //在自定义组件中使用ionic控件
	exports: [
	  ChatContainerComponent,
    ChatEleComponent,
    ChatSendEleComponent,
    EmojiPickerComponent,
    RecordComponent,
    RecordChatComponent,
    ImgChatEleComponent
   ]
})
export class ComponentsModule {}
