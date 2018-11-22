import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
newRoom;
finder;
findRoomName;
roomCalling;
roomName;
showFound;
showNew;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public fAuth: AngularFireAuth) {
  this.roomReference = firebase.database().ref('privateRooms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
    
  }

  // addRoom() {
  //   this.alert.create ({
  //     title: 'Add Room',
  //     inputs: [{
  //       name: 'room',
  //       placeholder: 'Room Title',
  //     }],
  //     buttons: [{
  //       text: 'Add Room',
  //       handler: room => {
  //         this.roomName = room;
  //         this.roomReference.set(this.roomName);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //     }
  //   ]
  //   }).present();
  //   console.log(this.roomName);
  // }

  addRoom() {
    this.showFound = false;
    this.showNew = true;
    this.newRoom = document.getElementById("new")["value"];
    this.roomCalling = firebase.database().ref('privateRooms/'+this.newRoom);
    console.log(this.newRoom);
  }

  send() {
    this.roomCalling.push({
      message: this.newmessage
    });
    if (this.showNew == true && this.showFound == false) {
    this.roomCalling.on('value',data => {
      let rm2 = [];
      data.forEach( data => {
        rm2.push({
          message: data.val().message,
        })
      });
      this.messagesList = rm2;
    });
    }
  }

  findRoom(){
    this.showFound = true;
    this.showNew = false;
    this.findRoomName = document.getElementById("look")["value"];
    this.finder = firebase.database().ref('privateRooms/'+this.findRoomName);
    //change here to prevent all messages from showing
    if (this.showFound == true && this.showNew == false) {
    this.finder.on('value',data => {
      let privRm = [];
      data.forEach( data => {
        privRm.push({
          message: data.val().message,
        })
      });
      this.messagesList = privRm;
    });
  }
    console.log(this.findRoomName);

  }
}
