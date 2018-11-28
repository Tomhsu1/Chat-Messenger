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
foundRoom;
chair;
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
    this.foundRoom = false;
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
  } else if (this.foundRoom == true) {
      this.finder.push({
        message: this.newmessage
      });
      if (this.showNew == false && this.showFound == true) {
        this.finder.on('value',data => {
          let founded = [];
          data.forEach( data => {
            founded.push({
              message: data.val().message,
            })
          });
          this.messagesList = founded;
          });
      }
    } else {
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
    this.foundRoom = true;
    this.findRoomName = (<HTMLInputElement>document.getElementById("look")).value;
    this.finder = firebase.database().ref('privateRooms/'+this.findRoomName);
    //after I reference it, how do i turn it into a variable i can use?
    this.enterPassword = (<HTMLInputElement>document.getElementById("enterPwd")).value;
    this.passwordRef = firebase.database().ref('privateRooms/'+this.findRoomName);
    if (this.showFound == true && this.showNew == false) {
    this.finder.on('value',data => {
      let privRm = [];
      data.forEach( data => {
        privRm.push({
          message: data.val().message
        })
      });
      this.messagesList = privRm;
    });
    this.passwordRef.on('value', data => {
      let findingPass = [];
      data.forEach( data => {
        findingPass.push({
          password: data.val().password
        })
      });
      this.callingPassword = findingPass;
    })
  }
  // this.chair = JSON.stringify(this.callingPassword);
  console.log(typeof this.findRoomName);
  console.log(typeof this.callingPassword);
  console.log(this.callingPassword);
  // console.log(this.chair);
  console.log(this.enterPassword);
  if (this.callingPassword == this.enterPassword) {
    console.log("password matches!");
  } else {
    console.log("not matching");
  }
}

  testPassword() {
    
  }
}
