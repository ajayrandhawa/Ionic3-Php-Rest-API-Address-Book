import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AddcontactPage } from '../../pages/Addcontact/Addcontact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public userDetails : any;
  public resposeData : any;
  public dataSet : any;

  userPostData = {
    "user_id": "",
    "token": "",
  };

  constructor( public authService : AuthServiceProvider,public navCtrl: NavController, private menuCtrl: MenuController, private loadctrl: LoadingController) {
    this.menuCtrl.enable(true);
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData = this.userDetails;
    this.getFeed();
  }

  getFeed() {
    let zest = this.loadctrl.create({
      content: "Getting Data"
    });  
    zest.present();
    this.authService.postData(this.userPostData, "getcontact").then((result) => {
      zest.dismiss();
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);
        } else {
          zest.dismiss();
          console.log("No access app");
        }

      }, (err) => {
        zest.dismiss();
        //Connection failed message
      });
  }

  onaddcick(){
    this.navCtrl.setRoot(AddcontactPage);
  }

}
