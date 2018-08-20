import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
//import { RegisterPage } from '../register/register';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, public authService: AuthServiceProvider, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
      this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let loader = this.loadingCtrl.create({
          content: "Fetching Server"
        });  
        loader.present();
    if(this.userData.username && this.userData.password && this.userData.username.length > 3 && this.userData.password.length > 3 ){
     this.authService.postData(this.userData, "login").then((result) =>{
      loader.dismiss();
     this.resposeData = result;
     console.log(this.resposeData);
     if(this.resposeData.userData){
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      this.navCtrl.setRoot(HomePage);
   }
   else{
   loader.dismiss();
    this.showalertinfo();
   }
     
     }, (err) => {
     loader.dismiss();
      this.showalertinfo();
       //Connection failed message
     });
    }
    else{
     loader.dismiss();
     //this.presentToast("Give username and password");
     this.showalertinfo();
    }
   
   }

  showalertinfo(){
    let alert = this.alertCtrl.create({
      title:"Notification",
      subTitle:"Give Valid Information",
      buttons:["OK"]
    });
    alert.present();
  }

  onregister(){
    this.navCtrl.push(RegisterPage);
  }

}
