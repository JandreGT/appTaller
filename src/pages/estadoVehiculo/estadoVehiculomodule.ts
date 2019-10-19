import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {  estadoVehiculoPage } from './estadoVehiculo';

@NgModule({
  declarations: [
    estadoVehiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(estadoVehiculoPage),
  ],
})
export class buscarVehiculoPageModule {}
