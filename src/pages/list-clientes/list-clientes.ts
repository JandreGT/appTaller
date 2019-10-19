import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController, ModalController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/index.services';
import { detalleVehiculoPage } from '../detalleVehiculo/detalleVehiculo';

@IonicPage()
@Component({
  selector: 'page-list-clientes',
  templateUrl: 'list-clientes.html',
})
export class ListClientesPage {

  misClientes:any =[]; 
  constructor(public navCtrl: NavController, public menuCtrl:MenuController, public modal:ModalController,
              public navParams: NavParams, public FirebaseServiceProvider:FirebaseServiceProvider) {
    
    //listado de productos
    FirebaseServiceProvider.getClientes()
      .subscribe(data=>{
        this.misClientes = data;    

        this.misClientes.forEach(element => {
          if (!element.vehiculo) {
            element.vehiculo = {};
            element.vehiculo.marca ='Sin Vehiculo'; 
          }
        }); 
      
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProductPage');
  }

  verMas(cliente){
    console.log(cliente);
    const  modal = this.modal.create(detalleVehiculoPage, { cliente: cliente});
    modal.present();    
  }

  mostrarMenu(){
    this.menuCtrl.toggle();
  }

}
