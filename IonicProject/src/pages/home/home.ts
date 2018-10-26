import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Component({})
class MyPage {
  constructor(public popoverCtrl: PopoverController) {}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

export class HomePage {

  
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public viewCtrl: ViewController) {
  
  }

  myFunction() {
    var x = document.createElement("IMG");
    x.setAttribute("src", "/assets/imgs/Tom.png");
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    document.body.appendChild(x);
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
          text: 'Create Account',
        },
        {
          text: 'Cancel',
        }],
      });
      prompt.present();
    }
  }


