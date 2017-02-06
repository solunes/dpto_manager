import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';
/*
  Generated class for the Debtor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-debtor',
    templateUrl: 'debtor.html'
})
export class DebtorPage {
	title_page = 'Deudores morosos';
    debtors: Array<JSON>;

    constructor(
        public http: HttpClient, 
        public navCtrl: NavController, 
        private loading: LoadingClient,
        private storage: Storage,
        public navParams: NavParams) {

        loading.showLoading();
        storage.get('token').then(value => {
            http.get('http://dptomanager.solunes.com/api/payment-details/total/apartment/pending/all/all', value)
            .map(res => res.json())
            .subscribe(result => {
                console.log(result['total_payments']);
                /*this.debtors = result['total_payments'];*/
                for (var i in result['total_payments']) {
                    console.log(i);
                }
                loading.dismiss();
            }, error => {
                loading.dismiss();
                loading.showError(error);
            });
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DebtorPage');
    }
}
