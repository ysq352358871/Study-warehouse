import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCountryPage } from './account-country';

@NgModule({
  declarations: [
    AccountCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountCountryPage),
  ],
})
export class AccountCountryPageModule {}
