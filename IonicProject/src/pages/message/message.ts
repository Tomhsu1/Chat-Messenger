import * as firebase from 'firebase';
import { Component, ViewChild, HostListener } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController,AlertController } from 'ionic-angular';
import { MenuController, Content } from 'ionic-angular';

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
  room1;
	name;
	newmessage;
  messagesList1;
  messagesList2;
  room2;
  showRoom1;
  showRoom2;
  showRoom: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public menuCtrl: MenuController) {
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
            message: data.val().message
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
            message: data.val().message
          })
        });
        this.messagesList2 = rm2;
      });
    }

  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if(event.keyCode  ===  13){
  //     //Press action
  //     this.room1.push({
  //       name: this.name.username,
  //       message: this.newmessage
  //    });
  //         }
  //     }
      send() {
        if (this.showRoom1 == true) {
        this.room1.push({
          name: this.name.username,
          message: this.newmessage
       });
      }
      if (this.showRoom2 == true) {
        this.room2.push({
          name: this.name.username,
          message: this.newmessage
       });
      }
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
    }

    
