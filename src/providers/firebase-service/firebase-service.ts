import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

   items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
   size$: BehaviorSubject<string|null>;

   constructor(public afDB: AngularFireDatabase) {
      
   }

   public getProductos(){
      return this.afDB.list('/productos').valueChanges(); 
      //Esta función devolverá todos los datos que tengamos en el apartado productos, en nuestra base de datos
   }

   public getClientes(){
      return this.afDB.list('/clientes').valueChanges(); 
      //Esta función devolverá todos los datos que tengamos en el apartado productos, en nuestra base de datos
   }
   public saveProducto(data){
      let key = this.afDB.list('/clientes').push(data).key;
      //Guardamos el prouducto y obetenemos el id que firebase pone al nudulo de nuestro producto.
      //Al guardarse sin id nuestro producto, ahora la actualizamos con el id que firebase nos devuelve.
      data.id = key;
      return this.afDB.database.ref('clientes/'+data.id).set(data);
   }

   public updateProducto(prod){
         //Actualizamos la fruta con el id que recibimos del objeto del parametro
         this.afDB.database.ref('productos/'+prod.id).set(prod);
   }
   public getProduct(id){
         return this.afDB.object('productos/'+id).valueChanges();
         //Devolvera la fruta con el id que le pasamos por parametro
   }
   
   public updateCliente(cliente){
      //Actualizamos la fruta con el id que recibimos del objeto del parametro
      return this.afDB.database.ref('clientes/'+cliente.id).set(cliente);
   }

   public removeFruit(id){
         this.afDB.database.ref('productos/'+id).remove();
         //Borrará la fruta con el id que le pasamos por parametro
   }

   public getVehiculos(){
      return this.afDB.list('/clientes').valueChanges(); 
      //Esta función devolverá todos los datos que tengamos en el apartado productos, en nuestra base de datos
   }

}
