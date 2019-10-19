import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage, DashboardPage, ListClientesPage, ClientePage,buscarVehiculoPage, estadoVehiculoPage } from '../pages/index.page';
import { Storage } from '@ionic/storage'; 

@Component({
   templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
 
login = HomePage;
dashboard = ListClientesPage;

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

      // this.rootPage = ListClientesPage; return 0;

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

   openPage(page:any) {
      this.nav.setRoot(page.component);
      this.menuCtrl.close();  
   }
   
   nuevoCliente() {
      this.nav.push(ClientePage);
      this.menuCtrl.close();
   }

   actividadCliente() {
      this.nav.push(buscarVehiculoPage);
      this.menuCtrl.close();
   }
 
   estadoVehiculo() {
      this.nav.push(estadoVehiculoPage);
      this.menuCtrl.close();
   }
   
   reset() {
      this.menuCtrl.close(); 
   }

   logout(){
      this.nav.setRoot(HomePage);
   }
}

