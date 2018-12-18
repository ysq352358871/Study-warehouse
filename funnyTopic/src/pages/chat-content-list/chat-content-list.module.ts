import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatContentListPage } from './chat-content-list';

@NgModule({
  declarations: [
    ChatContentListPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatContentListPage),
  ],
})
export class ChatContentListPageModule {}
