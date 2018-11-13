import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

/**
 * Generated class for the AddRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
roomReference;
messagesList;
name;
newmessage;
roomName;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public fAuth: AngularFireAuth) {
  this.roomReference = firebase.database().ref('privateRooms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

  addRoom() {
    this.alert.create ({
      title: 'Add Room',
      inputs: [{
        name: 'room',
        placeholder: 'Room Title',
      }],
      buttons: [{
        text: 'Add Room',
        handler: room => {
          this.roomName = room;
        }
      },
      {
        text: 'Cancel',
      }
    ]
    }).present();
    this.roomReference.on('value',data => {
      let privRm = [];
      data.forEach( data => {
        privRm.push({
          key: data.key,
          room: data.val().roomName,
          message: data.val().message,
        })
      });
      this.messagesList = privRm;
    });
  }

  send() {
    this.roomReference.push({
      message: this.newmessage,
      room: this.roomName
   });
  }

  findRoom(){

  }
}
