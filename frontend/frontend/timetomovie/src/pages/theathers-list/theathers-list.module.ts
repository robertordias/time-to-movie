import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TheathersListPage } from './theathers-list';

@NgModule({
  declarations: [
    TheathersListPage,
  ],
  imports: [
    IonicPageModule.forChild(TheathersListPage),
  ],
})
export class TheathersListPageModule {}
