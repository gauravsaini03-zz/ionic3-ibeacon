import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LockApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IBeacon } from '@ionic-native/ibeacon';
import { Diagnostic } from '@ionic-native/diagnostic';

@NgModule({
  declarations: [
    LockApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LockApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LockApp
  ],
  providers: [
    SplashScreen,
    StatusBar,
    IBeacon,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
