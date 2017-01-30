import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { PendingPaymentPage } from '../pages/pending-payment/pending-payment';
import { DebtorPage } from '../pages/debtor/debtor';
import { NotificationPage } from '../pages/notification/notification';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { RegisterPaymentPage } from '../pages/register-payment/register-payment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any;

  constructor(platform: Platform,
    private storage: Storage, 
    public menu: MenuController) {
    
    platform.ready().then(() => {
      
      this.storage.get('login').then((value) => {
        if(value) {
          this.rootPage = HomePage;
          console.log('home ');
        } else {
          this.rootPage = LoginPage;
          console.log('login');
        }
      });
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Pagos Pendientes', component: PendingPaymentPage },
        { title: 'Deudores Morosos', component: DebtorPage },
        { title: 'Notificaciones', component: NotificationPage },
        { title: 'Historial de Pagos', component: PaymentHistoryPage },
        { title: 'Acerca del edificio', component: AboutPage },
        { title: 'Registrar pago', component: RegisterPaymentPage }
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
