import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import { NativeStorage} from '@ionic-native/native-storage';
import { FCM,NotificationData } from '@ionic-native/fcm';
import { ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ChaptersListPage } from '../pages/chapters-list/chapters-list';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public NativeStorage:NativeStorage,
    private fcm: FCM,
    private toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'INICIO', component: HomePage },
      { title: 'CAPITULOS', component: ChaptersListPage }
      
    ];

  }

  
 
/*
  initializeApp() {
    this.platform.ready().then(() => {

      this.fcm.getToken().then(token => {
        //backend.registerToken(token);
        this.toast('Exitoso')
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          this.toast("Received in background");
        } else {
          this.toast("Received in foreground");
        };
      });


      let env = this;
      this.NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.nav.push(HomePage);
        env.splashScreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.push(LoginPage);
       // this.splashscreen.hide();
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }
  */

 initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
    //y procesar las notificaciones
    this.fcm.getToken()
      .then((token:string)=>{
        //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar mensajes
        // a esta  aplicación
        //o también copiar el token para usarlo con Postman :D
        console.log("The token to use is: ",token);
      })
      .catch(error=>{
        //ocurrió un error al procesar el token
        console.error(error);
      });

    /**
     * No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir procesando las notificaciones
     * */
    this.fcm.onTokenRefresh().subscribe(
      (token:string)=>console.log("Nuevo token",token),
      error=>console.error(error)
    );

    /**
     * cuando la configuración este lista, vamos a procesar los mensajes
     * */
    this.fcm.onNotification().subscribe(
      (data:NotificationData)=>{
        if(data.wasTapped){
          //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra en el dispositivo
          console.log("Received in background",JSON.stringify(data))
        }else{
          //ocurre cuando nuestra aplicación se encuentra en primer plano,
          //puedes mostrar una alerta o un modal con los datos del mensaje
          console.log("Received in foreground",JSON.stringify(data))
        }
       },error=>{
        console.error("Error in notification",error)
       }
    );

  });
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  toast(message:any){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
