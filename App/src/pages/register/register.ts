import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  responseData : any;
  userData = {"fname": "","lname": "", "username": "","password": ""};

  constructor(public authService:AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onlogin(){
    this.navCtrl.pop();
  }

  showalertinfo(){
    let alert = this.alertCtrl.create({
      title:"Notification",
      subTitle:"Give Valid Information",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertconnect(){
    let alert = this.alertCtrl.create({
      title:"Notification",
      subTitle:"Connection Failed!",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertsuccess(){
    let alert = this.alertCtrl.create({
      title:"Success!",
      subTitle:"You are Registered Sucessfully!",
      buttons:["OK"]
    });
    alert.present();
  }


  signup(){
    let loader = this.loadingCtrl.create({
      content: "Fetching Server"
    });  
    loader.present();
    if(this.userData.fname && this.userData.password && this.userData.lname && this.userData.username){
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
      loader.dismiss();
    this.responseData = result;
    console.log(this.responseData);
    localStorage.setItem('userData', JSON.stringify(this.responseData) );
    this.showalertsuccess();
    this.gotohome();
    }, (err) => {
      loader.dismiss();
      this.showalertconnect();
    });
  }
  else {
    loader.dismiss();
    this.showalertinfo();
  }
}

gotohome(){
  this.navCtrl.setRoot(HomePage);
}
}
