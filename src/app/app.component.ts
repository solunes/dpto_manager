import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { PendingPaymentPage } from '../pages/pending-payment/pending-payment';
import { DebtorPage } from '../pages/debtor/debtor';
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
    public push: Push,
    public menu: MenuController) {
    
    platform.ready().then(() => {
      
      this.storage.get('login').then((value) => {
        if(value) {
          this.rootPage = DebtorPage;
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
        { title: 'Historial de Pagos', component: PaymentHistoryPage },
        { title: 'Acerca del edificio', component: AboutPage },
        { title: 'Registrar pago', component: RegisterPaymentPage }
      ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });
 
      this.push.rx.notification()
      .subscribe((msg) => {
        console.log('I received awesome push: ' + msg);
      });
    });


  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
