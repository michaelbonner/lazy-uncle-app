import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENV } from '@app/env'

/*
  Generated class for the PersonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersonServiceProvider {

  constructor(public http: HttpClient) {}

  getAll(){
    return this.http.get(`${ENV.apiUrl}/api/person`);
  }

}
