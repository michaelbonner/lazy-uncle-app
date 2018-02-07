import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidDetailPage } from './kid-detail';

@NgModule({
  declarations: [
    KidDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(KidDetailPage),
  ],
})
export class KidDetailPageModule {}
