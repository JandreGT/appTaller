import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListClientesPage } from './list-clientes';

@NgModule({
  declarations: [
    ListClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListClientesPage),
  ],
})
export class ListClientesPageModule {}
