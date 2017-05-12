import { Injectable } from '@angular/core';

import { AboutPage } from '../pages/about/about';
import { DebtorPage } from '../pages/debtor/debtor';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/notification/notification';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { PendingPaymentPage } from '../pages/pending-payment/pending-payment';
import { RegisterPaymentPage } from '../pages/register-payment/register-payment';

/*
  Generated class for the AppRouter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppRouter {

  constructor() {
    console.log('Hello AppRouter Provider');
  }
  
  getPage(path): any{
    console.log(this.appRoutes.find(x => x.path == path));
    return this.appRoutes.find(x => x.path == path).component;
  }

  appRoutes: Array<{path: string, component: any, data:any}> = [
    {
      path: 'home',
      component: HomePage,
      data: { title: 'Inicio' }
    },
    {
      path: 'debtors',
      component: DebtorPage,
      data: { title: 'Deudores Morosos' }
    },
    {
      path: 'payment-history',
      component: PaymentHistoryPage,
      data: { title: 'Historial de Pagos' }
    },
    {
      path: 'pending-payment',
      component: PendingPaymentPage,
      data: { title: 'Pagos Pendientes' }
    },
    {
      path: 'about',
      component: AboutPage,
      data: { title: 'Acerca del edificio' }
    },
    {
      path: 'register-payment',
      component: RegisterPaymentPage,
      data: { title: 'Registrar pago' }
    }
  ];
}
