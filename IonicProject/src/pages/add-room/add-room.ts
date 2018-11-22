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
addedRoom = false;
password;
passwordRef;
enterPassword;
callingPassword;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public fAuth: AngularFireAuth) {
  this.roomReference = firebase.database().ref('privateRooms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
    
  }

  addRoom() {
    this.showFound = false;
    this.showNew = true;
    this.newRoom = (<HTMLInputElement>document.getElementById("new")).value;
    this.password = (<HTMLInputElement>document.getElementById("pwd")).value;
    this.roomCalling = firebase.database().ref('privateRooms/'+this.newRoom);
    console.log(this.newRoom);
    console.log(this.password);
    this.alert.create ({
          title: 'New Room: '+this.newRoom,
          buttons: [{
            text: 'Got it!'
          }
        ]
        }).present();
    this.addedRoom = true;
  }

  send() {
    if (this.addedRoom == true) {
    this.roomCalling.push({
      message: this.newmessage,
      password: this.password
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
    if (this.addedRoom == false) {
      this.alert.create({
        title: 'Make/Find a Room First!',
        buttons: [{
          text: 'Ok',
        }]
      }).present();
    }
  }

  findRoom(){
    this.showFound = true;
    this.showNew = false;
    this.findRoomName = (<HTMLInputElement>document.getElementById("look")).value;
    this.finder = firebase.database().ref('privateRooms/'+this.findRoomName);
    //after I reference it, how do i turn it into a variable i can use?
    this.enterPassword = (<HTMLInputElement>document.getElementById("enterPwd")).value;
    this.finder.on("value", function(snapshot) {
      console.log(snapshot.val());
   });
    if (this.showFound == true && this.showNew == false) {
    this.finder.on('value',data => {
      let privRm = [];
      data.forEach( data => {
        privRm.push({
          message: data.val().message,
          password: data.val().password
        })
      });
      this.messagesList = privRm;
    });
  }
    console.log(this.findRoomName);
  }

  testPassword() {
    if (this.enterPassword == this.callingPassword) {
      console.log("password matches!");
    }
  }
}
