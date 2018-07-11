import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChaptersListPage } from './chapters-list';

@NgModule({
  declarations: [
    ChaptersListPage,
  ],
  imports: [
    IonicPageModule.forChild(ChaptersListPage),
  ],
})
export class ChaptersListPageModule {}
