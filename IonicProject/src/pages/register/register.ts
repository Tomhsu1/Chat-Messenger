import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  account;
  public user:User = new User();
  person;
  email;
  name;
  username;
  userRef;
  emailCut;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth){

  }

  ionViewDidLoad() {

  }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully registered!");
        this.person = firebase.auth().currentUser;
        if (this.user != null) {
          this.email = this.user.email;
          this.name = this.username;
          console.log(this.email);
          console.log(this.name);
          this.emailCut = this.email.split('@')[0];
      }
        this.navCtrl.setRoot('MessagePage');
        this.account = firebase.database().ref('users/'+this.emailCut);
        this.account.push({
          username: this.username
        });
      }

    } catch (err) {
      console.error(err);
      alert(err);
    }
  }
}