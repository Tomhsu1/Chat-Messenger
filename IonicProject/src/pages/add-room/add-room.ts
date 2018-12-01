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
addedRoom = false;
password;
name;
passwordRef;
enterPassword;
callingPassword;
foundRoom;
foundPassword;
passwordString;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public fAuth: AngularFireAuth) {
  this.roomReference = firebase.database().ref('privateRooms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
    // this.alert.create({
  	// 	title:'Username',
  	// 	inputs:[{
  	// 		name:'username',
  	// 		placeholder: 'username'
  	// 	}],
  	// 	buttons:[{
  	// 		text: 'Continue',
  	// 		handler: username =>{
  	// 			this.name = username
  	// 		}
  	// 	}]
    // }).present();
  }

  addRoom() {
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
    this.roomCalling.push({
      password: this.password
    });
  }

  findRoom(){
    this.findRoomName = (<HTMLInputElement>document.getElementById("look")).value;
    this.finder = firebase.database().ref('privateRooms/'+this.findRoomName);
    this.enterPassword = (<HTMLInputElement>document.getElementById("enterPwd")).value;
    this.passwordRef = firebase.database().ref('privateRooms/'+this.findRoomName).limitToFirst(1);
    this.passwordRef.on('value', data => {
      let findingPass = [];
      data.forEach( data => {
        findingPass.push({
          password: data.val().password
        })
      });
      this.callingPassword = findingPass;
      console.log(this.callingPassword);
      this.foundPassword = JSON.stringify(this.callingPassword);
      console.log(this.foundPassword);
      //does not work when multiple messages inside the privateRoom
      this.passwordString = this.foundPassword.substring(14, this.foundPassword.length-3);
    console.log(this.passwordString);
    if (this.passwordString == this.enterPassword) {
      this.foundRoom = true;
      this.addedRoom = false;
      console.log("password matches!");
      this.finder.on('value',data => {
        let privRm = [];
        data.forEach( data => {
          privRm.push({
            message: data.val().message
          })
        });
        this.messagesList = privRm;
      });
    }
    if (this.passwordString !== this.enterPassword && this.foundRoom == false) {
      console.log("not matching");
      this.alert.create({
        title: 'Incorrect Password!',
        buttons: [{
          text: 'Ok',
        }]
      }).present();
    }
    });
  }

  send() {
    if (this.addedRoom == true && this.foundRoom == false) {
      this.roomCalling.push({
      message: this.newmessage
    });
    this.roomCalling.on('value',data => {
      let rm2 = [];
      data.forEach( data => {
        rm2.push({
          message: data.val().message,
        })
      });
      this.messagesList = rm2;
      });
  } else if (this.foundRoom == true && this.addedRoom == false) {
      this.finder.push({
        message: this.newmessage,
      });
        this.finder.on('value',data => {
          let founded = [];
          data.forEach( data => {
            founded.push({
              message: data.val().message,
            })
          });
          this.messagesList = founded;
          });
    } else {
      this.alert.create({
        title: 'Make/Find a Room First!',
        buttons: [{
          text: 'Ok',
        }]
      }).present();
    }
    this.newmessage = "";
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
}
