import { Component } from '@angular/core';
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
  templateUrl: 'payment-history.html'
})
export class PaymentHistoryPage {
	title_page = 'Historial de pagos';
  histories: Array<any>;

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
    })
  }

}
