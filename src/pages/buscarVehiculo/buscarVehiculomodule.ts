import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { buscarVehiculoPage } from './buscarVehiculo';

@NgModule({
  declarations: [
    buscarVehiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(buscarVehiculoPage),
  ],
})
export class buscarVehiculoPageModule {}
