import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  socket: any;
  socketHost: string = 'http://192.168.0.103:5000';
  laptop_status: any;

  constructor(
  	public navCtrl: NavController,
  	public platform: Platform,
  	private ibeacon: IBeacon) 
  {

  	this.initialize();

  	if (platform.is('cordova')) {

	  	// For iOS 8 we have to request permission explicitly
	  	this.ibeacon.requestAlwaysAuthorization();
			
			// create a new delegate and register it with the native layer
			let delegate = this.ibeacon.Delegate();

	    delegate.didStartMonitoringForRegion()
			  .subscribe(
			    data => console.log('didStartMonitoringForRegion: ', data),
			    error => console.error()
			  );
			
			delegate.didEnterRegion()
			  .subscribe(
			    data => {
			    	console.log("Entered Region", data);
			    	this.manageLaptop(data, "unlock");
			    }
			  );

			delegate.didExitRegion()
				.subscribe(
					data => {
						console.log("Exited Region",data);
			      this.manageLaptop(data, "lock");
			    }
			  );

			let beaconRegionEntrance = this.ibeacon.BeaconRegion('laptop','38a48d7e-05ab-11e7-93ae-92361f002671', 10, 5);
			
			this.ibeacon.startMonitoringForRegion(beaconRegionEntrance)
			  .then(
			    () => console.log('Started Monitoring', beaconRegionEntrance),
			    error => console.error('Failed to begin monitoring: ', error)
			  );

			this.ibeacon.enableDebugNotifications();
		}
  }

  manageLaptop(data,status) {
  	this.socket.emit('status', status);
  }

  initialize(){
    this.socket = io.connect(this.socketHost);
    
    this.socket.on("connect", (msg) => {
      console.log('on connect');
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('on reconnecting');
    });
    
    this.socket.on('disconnect', function () {
      console.log('user disconnected');
    });

    this.socket.on("result", (msg) => {
    	this.laptop_status = msg;
    	console.log(msg,"==received=msg==")
    });
  }

}
