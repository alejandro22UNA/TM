import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigureTestPage } from './configure-test';

@NgModule({
  declarations: [
    ConfigureTestPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigureTestPage),
  ],
})
export class ConfigureTestPageModule {}
