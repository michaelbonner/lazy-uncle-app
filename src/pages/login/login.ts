import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserDataServiceProvider } from '../../providers/user-data/user-data';

import { Events } from 'ionic-angular';

// import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs/tabs';
// import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: any = { email: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserDataServiceProvider, public events: Events) {
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if(hasLoggedIn){
        this.navCtrl.setRoot(TabsPage);
      }
    });
    events.subscribe('user:login', () => {
      this.navCtrl.setRoot(TabsPage);
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.email, this.login.password);
    }
  }

  // onSignup() {
  //   this.navCtrl.push(SignupPage);
  // }
}