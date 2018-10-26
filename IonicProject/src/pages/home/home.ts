import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public fAuth: AngularFireAuth) {

  }

  login() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Information',
      inputs: [{
        name: 'email',
        placeholder: 'Email Address'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }],
      buttons: [{
        text: 'Login',
      },
      {
        text: 'Cancel',
        }],
    });
    prompt.present();
    }

    makeAccount() {
      // let prompt = this.alertCtrl.create({
      //   title: 'Enter Information',
      //   inputs: [{
      //     name: 'email',
      //     placeholder: 'Email Address'
      //   },
      //   {
      //     name: 'password',
      //     placeholder: 'Password',
      //     type: 'password'
      //   }],
      //   buttons: [{
      //     text: 'Create Account',
      //   },
      //   {
      //     text: 'Cancel',
      //   }],
      // });
      // prompt.present();
      
    }

    logout() {
      this.fAuth.auth.signOut();
    }
  }


