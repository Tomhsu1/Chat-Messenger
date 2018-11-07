import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController,AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  ref;
	name;
	newmessage;
	messagesList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
    this.ref = firebase.database().ref('messages');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.alert.create({
  		title:'Username',
  		inputs:[{
  			name:'username',
  			placeholder: 'username'
  		}],
  		buttons:[{
  			text: 'Continue',
  			handler: username =>{
  				this.name = username
  			}
  		}]
  	}).present();
    this.ref.on('value',data => {
  		let tmp = [];
  		data.forEach( data => {
  			tmp.push({
  				key: data.key,
  				name: data.val().name,
  				message: data.val().message
  			})
  		});
  		this.messagesList = tmp;
  	});
    
  }

  createUsername() {
    
  }

  send(){
    this.ref.push({
       name: this.name.username,
       message: this.newmessage
    });
   }

}
