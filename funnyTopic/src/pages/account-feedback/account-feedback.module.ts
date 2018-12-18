import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountFeedbackPage } from './account-feedback';

@NgModule({
  declarations: [
    AccountFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountFeedbackPage),
  ],
})
export class AccountFeedbackPageModule {}
