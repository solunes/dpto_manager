import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { ToolbarComponent } from './toolbar.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PendingPaymentPage } from '../pages/pending-payment/pending-payment';
import { DebtorPage } from '../pages/debtor/debtor';
import { NotificationPage } from '../pages/notification/notification';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { RegisterPaymentPage } from '../pages/register-payment/register-payment';

import { AppSettings } from '../providers/app-settings';
import { AuthService } from '../providers/auth-service';
import { HttpClient } from '../providers/http-client';
import { LoadingClient } from '../providers/loading-client';

import { Currency } from '../app/pipes/currency';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '6e039abd'
  },
  'push': {
    'sender_id': '1086122766674',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#ff0000'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    ToolbarComponent,
    AboutPage,
    HomePage,
    LoginPage,
    PendingPaymentPage,
    DebtorPage,
    NotificationPage,
    PaymentHistoryPage,
    RegisterPaymentPage,
    Currency
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ToolbarComponent,
    AboutPage,
    HomePage,
    LoginPage,
    PendingPaymentPage,
    DebtorPage,
    NotificationPage,
    PaymentHistoryPage,
    RegisterPaymentPage
  ],
  providers: [
    AuthService,
    AppSettings, 
    HttpClient, 
    LoadingClient, 
    {provide: LOCALE_ID, useValue: 'es-ES'},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ] 
})
export class AppModule {}
