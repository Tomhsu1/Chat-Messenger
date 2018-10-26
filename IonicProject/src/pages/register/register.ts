import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

export class User {
    email: string;
    password: string;
}


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth){
  }


  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully registered!");
        this.navCtrl.setRoot('LoginScreenPage');
      }

    } catch (err) {
      console.error(err);
    }
  }
}