import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
    IonicModule.forRoot(MyApp)
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
  providers: [Storage, AuthService, AppSettings, HttpClient, LoadingClient, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
