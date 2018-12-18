import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteCommentPage } from './write-comment';

@NgModule({
  declarations: [
    WriteCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteCommentPage),
  ],
})
export class WriteCommentPageModule {}
