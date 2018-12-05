import * as firebase from 'firebase';
import { Component, ViewChild, HostListener } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController,AlertController } from 'ionic-angular';
import { MenuController, Content } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {DatePipe} from '@angular/common';
import { HomePage } from '../home/home';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@HostListener('document:keypress', ['$event'])
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  myDate: String = new Date().toISOString();
  room1;
	name;
	newmessage;
  messagesList1;
  messagesList2;
  room2;
  showRoom1;
  showRoom2;
  showRoom: any;
  time;
  email;
  user;
  username;
  emailCut;
  usernameString;
  usernameCut;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public menuCtrl: MenuController, public fAuth: AngularFireAuth, public datepipe: DatePipe) {
    this.room1 = firebase.database().ref('room1');
    this.room2 = firebase.database().ref('room2');

    this.showRoom = [
      "Room1",
      "Room2",
      "Room3"
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.alert.create({
      title:'Choose Room',
      buttons:[{
        text: 'Room1',
        handler: showRoom1 =>{
          this.showRoom1 = true;
          this.showRoom2 = false;
        }
      },
      {
        text: 'Room2',
       handler: showRoom2 => {
         this.showRoom2 = true;
         this.showRoom1 = false;
       }
      }]
    }).present();
      this.room1.on('value',data => {
        let rm1 = [];
        data.forEach( data => {
          rm1.push({
            username: data.val().username,
            message: data.val().message,
            time: data.val().time
          })
        });
        this.messagesList1 = rm1;
      });
      this.room2.on('value',data => {
        let rm2 = [];
        data.forEach( data => {
          rm2.push({
            username: data.val().username,
            message: data.val().message,
            time: data.val().time
          })
        });
        this.messagesList2 = rm2;
      });
      this.user = firebase.auth().currentUser;
      if (this.user != null) {
        this.email = this.user.email;
        console.log(this.email);
        this.emailCut = this.email.split('@')[0];
      } else {
        this.navCtrl.push('LoginScreenPage');
      }
      this.name = firebase.database().ref('users/'+this.emailCut);
      this.name.on('value',data => {
        let nameBase = [];
        data.forEach( data => {
          nameBase.push({
            username: data.val().username
          })
        });
        this.username = nameBase;
        console.log(this.username);
        this.usernameString = JSON.stringify(this.username);
        console.log(this.usernameString);
        this.usernameCut = this.usernameString.substring(14, this.usernameString.length-3);
        console.log(this.usernameCut);
      });
    }
    
      send() {
        this.time = new Date().toLocaleString();
        if (this.showRoom1 == true) {
        this.room1.push({
          username: this.usernameCut,
          message: this.newmessage,
          time: this.time
       });
      }
      if (this.showRoom2 == true) {
        this.room2.push({
          username: this.usernameCut,
          message: this.newmessage,
          time: this.time
       });
      }
      this.newmessage = "";
    }

      openRoom() {
        this.alert.create({
          title:'Choose Room',
          buttons:[{
            text: 'Room1',
            handler: showRoom1 =>{
              this.showRoom1 = true;
              this.showRoom2 = false;
            }
          },
          {
            text: 'Room2',
           handler: showRoom2 => {
             this.showRoom2 = true;
             this.showRoom1 = false;
           }
          }]
        }).present();
      }

      logout() {
        this.fAuth.auth.signOut();
        console.log("Logged out");
        this.navCtrl.setRoot(HomePage);
      }
      test() {
        this.user = firebase.auth().currentUser;
      if (this.user != null) {
        this.email = this.user.email;
        console.log(this.email);
    }
    }
  }

    
