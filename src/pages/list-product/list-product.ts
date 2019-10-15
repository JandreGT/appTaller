import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/index.services';

@IonicPage()
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage {

  misClientes:any =[]; 
  constructor(public navCtrl: NavController, public menuCtrl:MenuController, 
              public navParams: NavParams, public FirebaseServiceProvider:FirebaseServiceProvider) {
    
    //listado de productos
    FirebaseServiceProvider.getClientes()
      .subscribe(data=>{
        this.misClientes = data;    
    });

    // console.log(this.misClientes);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProductPage');
  }

  mostrarMenu(){
    this.menuCtrl.toggle();
  }

}
