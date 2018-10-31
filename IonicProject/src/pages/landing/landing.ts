import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAuth: AngularFireAuth, public alertCtrl: AlertController) {
  }

  newChat() {
    let prompt = this.alertCtrl.create({
      title: 'New Message',
      inputs: [{
        name: 'email',
        type: 'text',
        placeholder: 'Email Address'
      },{
        name: 'message',
        type: 'text',
        placeholder: 'Type message here'
      }],
      buttons: [{
        text: "Cancel"
      },
      {
        text: "Send",
    }]
    });
    prompt.present();
  }

  logout() {
    this.fAuth.auth.signOut();
    console.log("Logged out");
    this.navCtrl.setRoot('LoginScreenPage');
  }

}
