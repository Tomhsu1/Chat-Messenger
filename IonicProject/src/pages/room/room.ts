import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  

  rooms = [];
ref = firebase.database().ref('chatrooms/');


constructor(public navCtrl: NavController, public navParams: NavParams) {
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

}
