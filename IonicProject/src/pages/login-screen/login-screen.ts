import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class User {
  email: string;
  password: string;
}

@IonicPage()
@Component({
  selector: 'page-login-screen',
  templateUrl: 'login-screen.html',
})
export class LoginScreenPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAuth: AngularFireAuth) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginScreenPage');
  }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.navCtrl.push('HomePage');
      }

    } catch (err) {
      console.error(err);
    }
  }
}
