import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';

/*
  Generated class for the PaymentHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html',
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
export class PaymentHistoryPage {
	title_page = 'Historial de pagos';
  histories: Array<any>;
  notificationsCount: number;

  constructor(public http: HttpClient, 
        public navCtrl: NavController, 
        private loading: LoadingClient,
        private storage: Storage,
        public navParams: NavParams) {

    loading.showLoading();
    storage.get('token').then(value => {
      http.get('http://dptomanager.solunes.com/api/accounts/all/me/all', value)
      .map(res => res.json())
      .subscribe(result => {
          this.histories = result['accounts'];
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
