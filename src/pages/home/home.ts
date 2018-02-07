import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KidDetailPage } from '../kid-detail/kid-detail';
import { PersonServiceProvider } from '../../providers/person-service/person-service';
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

  constructor(public navCtrl: NavController, private personService: PersonServiceProvider) {
    this.initializeKids();
  }

  initializeKids(){        
    this.personService.getAll()
      .subscribe(
      (response: any) => {
        this.kids = response.map(kid => {
          kid.birthday = new Date(kid.birthday.replace(' ','T'));
          const date = kid.birthday.getDate() < 10 ? `0${kid.birthday.getDate()}` : kid.birthday.getDate();
          kid.dateSort = parseInt( `${kid.birthday.getMonth()}${date}` );
          return kid;
        });
      },
      error => console.log( error )
    );
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
