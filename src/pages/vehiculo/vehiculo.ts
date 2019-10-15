import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-vehiculo',
  templateUrl: 'vehiculo.html',
})
export class vehiculoPage {

  vehiculo: any = {};

  constructor(public viewCtrl:ViewController) {
  }

  setVehiculo(){
    this.viewCtrl.dismiss(this.vehiculo);    
  }

  // closeModal(){
  //   this.viewCtrl.dismiss();
  // }
}
