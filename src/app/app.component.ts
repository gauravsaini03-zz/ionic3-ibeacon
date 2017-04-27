import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IBeacon } from '@ionic-native/ibeacon';
import { Diagnostic } from '@ionic-native/diagnostic';

// import { TabsPage } from '../pages/tabs/tabs';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class LockApp {
  rootPage = 'TabsPage';

  constructor(
    platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ibeacon: IBeacon,    
    private diagnostic: Diagnostic
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (platform.is('cordova')) {
        
        // Checks if bluetooth is enabled
        this.ibeacon.isBluetoothEnabled().then((isEnabled) => {
          console.log("isEnabled: " + isEnabled);
          if (!isEnabled) {
            // If not, enableBluetooth() enables it
            this.ibeacon.enableBluetooth();     
          }
        })

        // Check if location is enabled
        this.diagnostic.isLocationEnabled().then((result) => {
          // If not, open location settings
          if(!result) {
            this.diagnostic.switchToLocationSettings();  
          }
        })
        
        // Diagnostic plugin
        // After Android 6, we need to explicitly 
        // ask for permission from the user
        this.diagnostic.requestRuntimePermissions([
          cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION,
          cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION
        ])
      }
    });
  }
}
