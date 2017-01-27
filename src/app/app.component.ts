import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Globals } from './globals';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html',
  providers: [Globals]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any;

  constructor(platform: Platform, private globals: Globals,
    private storage: Storage, public menu: MenuController) {
    platform.ready().then(() => {
      
      this.storage.get('login').then((value) => {
        if(value) {
          this.rootPage = AboutPage;
          console.log('home ');
        } else {
          this.rootPage = LoginPage;
          console.log('login');
        }
      });
      this.pages = [
        { title: 'Inicio', component: AboutPage },
        /*{ title: 'Pagos Pendientes', component: PendingPaymentsPage },*/
        /*{ title: 'Deudores Morosos', component: DebtorsPage },
        { title: 'Notificaciones', component: NotificationsPage },
        { title: 'Historial de Pagos', component: PaymentsHistoryPage },*/
        { title: 'Acerca del edificio', component: ContactPage }
        /*{ title: 'Registrar pago', component: RegisterPaymentPage }*/
      ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    console.log(page);
    this.nav.setRoot(page.component);
  }
}
