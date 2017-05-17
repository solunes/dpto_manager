import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';
/*
  Generated class for the PendingPayment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pending-payment',
  templateUrl: 'pending-payment.html',
  animations: [
    trigger('itemState', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      //Enter
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-50%)'
        }),
        animate('400ms ease-in-out')
      ]),
    ])
  ]
})
export class PendingPaymentPage {
	title_page = 'Pagos Pendientes';
  pendingPayments: Array<any>;
  notificationsCount: number;

  constructor(public navCtrl: NavController, 
        public http: HttpClient, 
        private loading: LoadingClient,
        private storage: Storage) {

    loading.showLoading();
        storage.get('token').then(value => {
            http.get('http://dptomanager.solunes.com/api/payment-details/detail/me/pending/all/all', value)
            .timeout(3000)
            .map(res => res.json())
            .subscribe(result => {
                console.log(JSON.stringify(result));
                this.pendingPayments = result['detail_payments'];
                loading.dismiss();
            }, error => {
                loading.dismiss();
                loading.showError(error);
            });
        });
        storage.get('notificationsCount').then(value => {
          this.notificationsCount = value;
        });
  }
}
