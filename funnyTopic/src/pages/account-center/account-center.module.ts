import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCenterPage } from './account-center';

@NgModule({
  declarations: [
    AccountCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountCenterPage),
  ],
})
export class AccountCenterPageModule {}
