import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRoomTwoPage } from './chat-room-two';
//import { EmojiPickerComponent } from "../../components/emoji-picker/emoji-picker";
import { EmojiProvider } from "../../providers/emoji";
import { ComponentsModule } from '../../components/components.module';
//import { RecordComponent } from '../../components/record/record';
@NgModule({
  declarations: [
    ChatRoomTwoPage,
    // RecordComponent,
    // EmojiPickerComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChatRoomTwoPage),
  ],
  providers: [
    EmojiProvider
  ]
})
export class ChatRoomTwoPageModule {}
