import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController,MenuController } from 'ionic-angular';
import { NavController} from 'ionic-angular'; 
import { FirebaseServiceProvider } from '../../providers/index.services';
 
@Component({
  selector: 'page-buscarVehiculo',
  templateUrl: 'buscarVehiculo.html',
})
export class buscarVehiculoPage {
 
   crearMod  :any = {};
   cliente   :any = {}; 
   vehiculos :any = []; 
   vehiculo  :any = {}; 

   constructor(public alertCtrl:AlertController, public loadingCtrl:LoadingController, 
               public modal:ModalController, public menuCtrl:MenuController,
               public FirebaseServiceProvider:FirebaseServiceProvider,
               public navCtrl: NavController){
                  
      this.crearMod.fecha = new Date().toISOString();
      this.crearMod.terminado = 0;
      console.log(this.crearMod.fecha);
   }

   mostrarMenu(){
      this.menuCtrl.toggle();
   }

   buscar(){

         this.FirebaseServiceProvider.getVehiculos()
            .subscribe(prod=>{

               this.vehiculos = prod;

               this.crearMod.existe = false;
               this.vehiculos.forEach(element => {              
                  if(element.vehiculo!=undefined){
                     if(element.vehiculo.placa==this.vehiculo.placa) {
                        this.cliente = element;
                        this.cliente.marcaVehiculo = element.vehiculo.marca +' '+ element.vehiculo.modelo +' '+ element.vehiculo.color;
                        this.cliente.trabajoVehiculo = 'Trabajos: '+element.vehiculo.trabajos;
                        console.log(this.cliente);
                        this.crearMod.existe = true;
                        
                     }
                  }
               }); 
               
               if(!this.crearMod.existe) {
                  this.alertCtrl.create({
                     title: 'Mensaje',
                     subTitle: 'El numero de placa no existe en la base de datos',
                     buttons: ['OK']
                  }).present()  
               }
         });

   }

   clienteUpdate(){
      let indice = (this.cliente.trabajos+1);
      this.cliente.add[indice] = this.crearMod;
      this.cliente.trabajos = this.cliente.trabajos+1;
      this.cliente.terminado = this.crearMod.terminado;
      this.FirebaseServiceProvider.updateCliente(this.cliente);

      this.cliente = {};
   }
}
