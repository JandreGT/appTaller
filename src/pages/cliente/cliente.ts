import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController,MenuController } from 'ionic-angular';
import { storage} from 'firebase'; 
import { NavController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseServiceProvider } from '../../providers/index.services';  
import { vehiculoPage } from '../vehiculo/vehiculo';
 
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  imageURI: any;
  imagePreview: string = '';
  imagedowload: any;

  SelectImage: CameraOptions = {
    quality: 50,
    destinationType: 0,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  optionsImage: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  //   correctOrientation:true
  }

  crearCliente: any = {};
  productos = []; 

  constructor(public alertCtrl:AlertController, public loadingCtrl:LoadingController, 
              public modal:ModalController, public menuCtrl:MenuController,
              private camera:Camera,            public FirebaseServiceProvider:FirebaseServiceProvider,
              public navCtrl: NavController){
                 
     //listado de  productos       
     FirebaseServiceProvider.getProductos()
        .subscribe(prod=>{
           this.productos = prod;
     });

  }

  mostrarMenu(){
   this.menuCtrl.toggle();
  }

   getImage(){

     this.camera.getPicture(this.optionsImage).then((imageData) => {
        
        this.imageURI = imageData;
        this.imagePreview = 'data:image/jpeg;base64,' + imageData;
  
        //guarda la imagen en firebase.
        var storageRef = storage().ref();

        var mountainsRef = storageRef.child(this.crearCliente.nombre); 
                          mountainsRef.putString(this.imagePreview,'data_url');
     
        setTimeout( () => {
           this.imagedowload = mountainsRef.getDownloadURL().then(function(url) {
              return url;
           });
        },5000);
  
     },(err) => { 
        
       this.alertCtrl.create({
         title: 'Error al Abrir la camara',
         subTitle: err,
         buttons: ['OK']
       }).present()

     });
   }

   clienteCreate(){

     const loading = this.loadingCtrl.create({
        content:  'Almacenando cliente. Por favor, espere...',
     });
     loading.present();

     this.crearCliente.imagen=this.imagedowload.i;

     this.FirebaseServiceProvider.saveProducto(this.crearCliente);

     loading.dismiss();

     this.alertCtrl.create({
        title: 'Excelente',
        subTitle: 'Cliente creado correctamente ',
        buttons: [
           {
              text: 'Ok', 
              handler: () => {
                 this.imagePreview = "";
              }
           }
         ]
     }).present()
     
   } 

   setVehiculo(){      
      const  modal = this.modal.create(vehiculoPage);
      modal.present();

      //datos del vehiculo retornado por el modal
      modal.onDidDismiss((data) => {
         this.crearCliente.vehiculo = data;         
      })
   }
}
