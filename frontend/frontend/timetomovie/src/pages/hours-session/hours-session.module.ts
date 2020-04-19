import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoursSessionPage } from './hours-session';

@NgModule({
  declarations: [
    HoursSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(HoursSessionPage),
  ],
})
export class HoursSessionPageModule {}
