import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

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

  chat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAuth: AngularFireAuth, public alertCtrl: AlertController) {
  this.chat = [

  ];
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
        handler: data => {
          this.chat.push(data.email, data.message);
        }
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
