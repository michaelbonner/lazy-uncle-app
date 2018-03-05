import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Jwt } from '../../interfaces/jwt';

import { ENV } from '@app/env';

@Injectable()
export class UserDataServiceProvider {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public http: HttpClient,
  ) {}

  login(email: string, password: string): void {
    this.http.post(`${ENV.apiUrl}/api/auth/login`, {
        email, password
      }).subscribe( (data: Jwt) => {
        if( data.access_token ) {
          localStorage.setItem('access_token',data.access_token);
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.setEmail(email);
          this.events.publish('user:login');
        }
      },
      err => console.log(err));
  };

  signup(email: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setEmail(email);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('email');
    this.events.publish('user:logout');
  };

  setEmail(email: string): void {
    this.storage.set('email', email);
  };

  getEmail(): Promise<string> {
    return this.storage.get('email').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
