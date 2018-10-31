import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environment/environment';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(CREDENTIALS),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

// var CREDENTIALS = {
//   apiKey: "AIzaSyBXLE79PVPwj5uEfQVxVagmL5vnUGg_WfU",
//     authDomain: "chat-messenger-5c.firebaseapp.com",
//     databaseURL: "https://chat-messenger-5c.firebaseio.com",
//     projectId: "chat-messenger-5c",
//     storageBucket: "chat-messenger-5c.appspot.com",
//     messagingSenderId: "154690224363"

// };
