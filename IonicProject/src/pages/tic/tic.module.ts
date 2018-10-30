import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicPage } from './tic';

@NgModule({
  declarations: [
    TicPage,
  ],
  imports: [
    IonicPageModule.forChild(TicPage),
  ],
})
export class TicPageModule {}
