import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { HomePage } from '../pages/home/home';
// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyA42Yct7VLWgnnEEusWuY5tPlFTqFj2F5A",
    authDomain: "fir-realtime-e9a30.firebaseapp.com",
    databaseURL: "https://fir-realtime-e9a30.firebaseio.com",
    storageBucket: "fir-realtime-e9a30.appspot.com",
    messagingSenderId: "516180830611"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
