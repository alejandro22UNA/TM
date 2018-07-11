import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {FCM} from "@ionic-native/fcm";

import {GooglePlus} from '@ionic-native/google-plus';
import {NativeStorage} from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';

//services
import{TeoricoService} from '../services/teorico.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { ChaptersListPage } from '../pages/chapters-list/chapters-list';
import {ConfigureTestPage} from '../pages/configure-test/configure-test';
import {ViewScorePage} from '../pages/view-score/view-score';
import {LoginPage} from '../pages/login/login';
import {RegistroPage} from '../pages/registro/registro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChaptersListPage,
    TestPage,
    ConfigureTestPage,
    ViewScorePage,
    LoginPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChaptersListPage,
    TestPage,
    ConfigureTestPage,
    ViewScorePage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TeoricoService,
    GooglePlus,
    NativeStorage,
    ToastController,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
