import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalleVehiculo',
  templateUrl: 'detalleVehiculo.html',
})
export class detalleVehiculoPage {

  cliente: any = {};

  constructor(public viewCtrl:ViewController, public navParams: NavParams,){
    this.cliente = this.navParams.get('cliente');
    console.log(this.cliente);
  }

  setVehiculo(){
    this.viewCtrl.dismiss();    
  }

  // closeModal(){
  //   this.viewCtrl.dismiss();
  // }
}
