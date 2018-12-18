import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRoomPage } from './chat-room';
//import { EmojiPickerComponent } from "../../components/emoji-picker/emoji-picker";
import { EmojiProvider } from "../../providers/emoji";
import { ComponentsModule } from '../../components/components.module'
//import { RecordComponent } from '../../components/record/record';
//import { RecordChatComponent } from '../../components/record-chat/record-chat';
@NgModule({
  declarations: [
    ChatRoomPage,
    //RecordComponent,
    //RecordChatComponent
    //EmojiPickerComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChatRoomPage),
  ],
  providers: [
    EmojiProvider
  ]
})
export class ChatRoomPageModule {}
