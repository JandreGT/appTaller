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
  imageFirebase: any;

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

  constructor(public alertCtrl:AlertController, public loadingCtrl:LoadingController, 
              public modal:ModalController, public menuCtrl:MenuController,
              private camera:Camera, public FirebaseServiceProvider:FirebaseServiceProvider,
              public navCtrl: NavController){
   
      this.crearCliente.fecha = new Date().toISOString();
      console.log(this.crearCliente.fecha);
  }

  mostrarMenu(){
   this.menuCtrl.toggle();
  }

   getImage(){

     this.camera.getPicture(this.optionsImage).then((imageData) => {

      this.imageURI = imageData;
      this.imagePreview = 'data:image/jpeg;base64,' + imageData;

      this.imagedowload = new Promise<any>((resolve, reject) => {

         let storageRef = storage().ref();
         let imageRef = storageRef.child('image').child(this.crearCliente.nombre);
         
            imageRef.putString(this.imagePreview, 'data_url')

            .then(snapshot => {
                  snapshot.ref.getDownloadURL()
                  .then(res => resolve(res))
            }, err => {
               reject(err);
            })
       
       })

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
 
      if(typeof this.imagedowload === 'undefined') {
         this.crearCliente.imagen = 'https://firebasestorage.googleapis.com/v0/b/taller-e93fc.appspot.com/o/image%2Fcarro.jpg?alt=media&token=7c339678-3f77-40c0-98c6-00f673e93c07';
      }else{
         this.crearCliente.imagen = this.imagedowload.__zone_symbol__value;
      }
    
      this.crearCliente.add = {};
      this.crearCliente.add[0] = '';
      this.crearCliente.trabajos = 0;
      this.crearCliente.terminado = 0;
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
