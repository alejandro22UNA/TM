import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage} from '../home/home';
import {GooglePlus} from '@ionic-native/google-plus';
import { NativeStorage} from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';
import {FCM, NotificationData} from "@ionic-native/fcm";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  token:any;

  isLoggedIn:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    private googlePlus: GooglePlus,
    private nativeStorage:NativeStorage,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fcm:FCM,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  this.fcm.subscribeToTopic('topic');
      //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
      //y procesar las notificaciones
      this.fcm.getToken()
        .then((token:String)=>{
          //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar mensajes
          // a esta  aplicación
          //o también copiar el token para usarlo con Postman :D

          console.log("The token to use is: "+ token);
          this.token = token;
          //console.log(token);
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
  
  }
/*
  doGoogleLogin(){
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '344328549857-l6hkjjg6td8g8r8ii3qgb24465f7vh39.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(function (user) {
     // loading.dismiss();
  
      env.nativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(function(){
        nav.push(HomePage);
      }, function (error) {
        this.toast(error);
      })
    }, function (error) {
     // loading.dismiss();
    });
}
*/

login() {
  
  this.googlePlus.login({
    'scopes': 'email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '344328549857-l6hkjjg6td8g8r8ii3qgb24465f7vh39.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  }).then(res => {
      this.toast(res);
      
      this.displayName = res.displayName;
      this.email = res.email;
      this.familyName = res.familyName;
      this.givenName = res.givenName;
      this.userId = res.userId;
      this.imageUrl = res.imageUrl;

      this.isLoggedIn = true;
      this.toast('exitoso');
      this.goHome();
    }).catch(err => this.toast('error'));
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
  goHome(){ 
    this.navCtrl.push(HomePage);
  }


}
