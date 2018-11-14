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
newmessage;
roomName;
finder;
findRoomName;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public fAuth: AngularFireAuth) {
  this.roomReference = firebase.database().ref().child('privateRooms');
  this.finder = firebase.database().ref('privateRooms').equalTo('findRoomName')
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
    console.log(this.roomName);
  }

  send() {
    this.roomReference.set(this.roomName);
    //this.roomReference = firebase.database().ref("privateRooms/"+this.roomName);
    //fix here idk how to get it to work dang it i want a child of a child to push the message to the room
    //i also need to figure out how to add multiple childs instead of just one
    this.roomReference.push({
      message: this.newmessage
    });
  }

  findRoom(){
    this.alert.create ({
      title: 'Find Room',
      inputs: [{
        name: 'roomNameKey',
        placeholder: 'Room Name',
      }],
      buttons: [{
        text: 'Find Room',
        handler: roomNameKey => {
          this.findRoomName = roomNameKey;
        }
      },
      {
        text: 'Cancel',
      }
    ]
    }).present();
    this.findRoomName = this.roomName;

    //change here to prevent all messages from showing
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
  
}
