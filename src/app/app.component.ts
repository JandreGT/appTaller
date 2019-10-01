import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage, DashboardPage, productoPage, PagoQrPage, ListProductPage } from '../pages/index.page';
import { Storage } from '@ionic/storage'; 

@Component({
   templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
 
login = HomePage;
dashboard = productoPage;

rootPage: any;

pages: Array<{ title: string, component: any }>;

constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
            public storage: Storage, public menuCtrl: MenuController, public screenOrientation: ScreenOrientation) {

   this.initializeApp();
   statusBar.styleLightContent();
   
   this.pages = [
      { title: 'Inicio', component: DashboardPage }, 
   ];
}

   initializeApp() {

      this.platform.ready().then(() => {

         this.storage.ready().then(() => {
            this.splashScreen.hide(); 
            this.rootPage = this.login;
         });

         if (this.platform.is("cordova")) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
         }
      });
   }


   irQR(){
      this.nav.setRoot(PagoQrPage);
      this.menuCtrl.close(); 
   }

   openPage(page:any) {
      this.nav.setRoot(page.component);
      this.menuCtrl.close();  
   }

   irNuevoProducto() {
      this.nav.push(productoPage);
      this.menuCtrl.close();
   }
   
   listadoProductos() {
      this.nav.push(ListProductPage);
      this.menuCtrl.close();
   }
   
   reset() {
      this.menuCtrl.close(); 
   }

   logout(){
      this.nav.setRoot(HomePage);
   }
}

