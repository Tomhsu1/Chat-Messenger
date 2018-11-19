import * as firebase from 'firebase';
import { Component, ViewChild, HostListener } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController,AlertController } from 'ionic-angular';
import { MenuController, Content } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginScreenPage } from '../login-screen/login-screen';
import { timestamp } from 'rxjs/operators';
import {DatePipe} from '@angular/common';

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
  currentTime;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public menuCtrl: MenuController, public fAuth: AngularFireAuth, public datepipe: DatePipe) {
    this.room1 = firebase.database().ref('room1');
    this.room2 = firebase.database().ref('room2');
    this.showRoom = [
      "Room1",
      "Room2",
      "Room3"
    ]
    let myDate = new Date(); 
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
      this.room1.on('value',data => {
        let rm1 = [];
        data.forEach( data => {
          rm1.push({
            key: data.key,
            name: data.val().name,
            message: data.val().message,
            date: this.myDate
          })
        });
        this.messagesList1 = rm1;
      });
      this.room2.on('value',data => {
        let rm2 = [];
        data.forEach( data => {
          rm2.push({
            key: data.key,
            name: data.val().name,
            message: data.val().message,
            date: this.myDate
          })
        });
        this.messagesList2 = rm2;
      });
    }
    
      send() {
        if (this.showRoom1 == true) {
        this.room1.push({
          name: this.name.username,
          message: this.newmessage,
          date: this.myDate
       });
      }
      if (this.showRoom2 == true) {
        this.room2.push({
          name: this.name.username,
          message: this.newmessage,
          date: this.myDate
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
        this.navCtrl.setRoot('LoginScreenPage');
      }
    }

    
