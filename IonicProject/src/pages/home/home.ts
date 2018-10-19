import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  login() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Information',
      inputs: [{
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }],
    });
}
}
