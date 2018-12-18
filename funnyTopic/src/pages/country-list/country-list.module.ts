import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountryListPage } from './country-list';

@NgModule({
  declarations: [
    CountryListPage,
  ],
  imports: [
    IonicPageModule.forChild(CountryListPage),
  ],
})
export class CountryListPageModule {}
