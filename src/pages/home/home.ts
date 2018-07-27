import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { KidDetailPage } from '../kid-detail/kid-detail';
import { LoginPage } from '../login/login';
import { PersonServiceProvider } from '../../providers/person-service/person-service';
import { UserDataServiceProvider } from '../../providers/user-data/user-data';
import { Kid } from '../../interfaces/kid';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  kids: Kid[] = [];

  searchQuery: string = '';

  sortBy: string = 'dateSort';

  descending: boolean = true;

  constructor(public navCtrl: NavController, private personService: PersonServiceProvider, private userData: UserDataServiceProvider, private events: Events) {
    this.initializeKids();

    this.events.subscribe('user:logout', () => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  initializeKids(){        
    this.personService.getAll()
      .subscribe(
      (response: any) => {
        this.kids = response.map(kid => {
          kid.birthday = new Date(kid.birthday);
          kid.birthday.setMinutes( kid.birthday.getMinutes() + kid.birthday.getTimezoneOffset() );
          const date = kid.birthday.getDate() < 10 ? `0${kid.birthday.getDate()}` : kid.birthday.getDate();
          kid.dateSort = parseInt( `${kid.birthday.getMonth()}${date}` );
          return kid;
        });
        const currentDate = new Date();
        const date = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
        const currentDateKid: Kid = { 
          name: 'Current Date', 
          birthday: currentDate, 
          dateSort: parseInt( `${currentDate.getMonth()}${date}` ) 
        };
        this.kids.push(currentDateKid);
      },
      error => {
        this.userData.logout();
      } 
    );
  }

  logout(){
    this.userData.logout();
  }

  kidSelected(kid){
    this.navCtrl.push(KidDetailPage, { sessionId: kid.name, kid: kid });
  }

  calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  sort(sortBy){
    if( this.sortBy === sortBy ){
      this.descending = !this.descending;
    }
    this.sortBy = sortBy;
  }

}
