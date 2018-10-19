import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginScreenPage } from './login-screen';

@NgModule({
  declarations: [
    LoginScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginScreenPage),
  ],
})
export class LoginScreenPageModule {}
