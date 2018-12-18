import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidationDetailPage } from './validation-detail';

@NgModule({
  declarations: [
    ValidationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidationDetailPage),
  ],
})
export class ValidationDetailPageModule {}
