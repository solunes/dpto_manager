import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, AlertController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {
  Push,
  PushToken, IPushMessage
} from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { PendingPaymentPage } from '../pages/pending-payment/pending-payment';
import { DebtorPage } from '../pages/debtor/debtor';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { RegisterPaymentPage } from '../pages/register-payment/register-payment';
import { NotificationPage } from '../pages/notification/notification';

import { LoadingClient } from '../providers/loading-client';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any;

  constructor(public platform: Platform,
    private load: LoadingClient, 
    private storage: Storage, 
    public push: Push,
    public alertCtrl: AlertController,
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

      this.initPush();
    });
  }

  public initPush() {
    if (!this.platform.is('cordova')) {
        console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
        console.log("virtual");
        return;
    }
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      this.push.saveToken(t);
      console.log('Token saved:', t.token);
    });
 
    this.push.rx.notification().subscribe((data:IPushMessage) => {
      console.log('I received awesome push: ' + JSON.stringify(data));
      console.log('Foreground: ' +data['raw']);
      console.log('Foreground: ' +data['raw'].additionalData);
      if (data.raw.additionalData.foreground) {
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.raw.message,
          buttons: [{
            text: 'Ignorar',
            role: 'cancel'
          }, {
            text: 'Ver',
            handler: () => {
              //TODO: Your logic here
              this.nav.setRoot(NotificationPage, {message: data.raw.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        this.nav.setRoot(NotificationPage, {message: data.raw.message});
      }
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
