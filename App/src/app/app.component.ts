import { Component, ViewChild } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AddcontactPage } from '../pages/Addcontact/Addcontact';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
    
  rootPage = LoginPage;

  constructor(platform: Platform, public SplashScreen: SplashScreen, public StatusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.StatusBar.styleDefault();
      this.SplashScreen.hide();
    });
  }

  onclickHome(){
    this.nav.setRoot(HomePage);
  }

  onclickadd(){
    this.nav.setRoot(AddcontactPage);
  }

  onclicklogout(){
    this.nav.setRoot(LoginPage);
  }
}
