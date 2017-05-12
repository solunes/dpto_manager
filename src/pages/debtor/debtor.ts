import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavParams } from 'ionic-angular';

import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';
/*
  Generated class for the Debtor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-debtor',
  templateUrl: 'debtor.html',
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
export class DebtorPage {
	title_page = 'Deudores morosos';
  notificationsCount: number;
  debtors: Array<JSON>;

  constructor(
    public http: HttpClient, 
    private loading: LoadingClient,
    private storage: Storage,
    public navParams: NavParams) {

    loading.showLoading();
    storage.get('token').then(value => {
      http.get('http://dptomanager.solunes.com/api/payment-details/total/apartment/pending/all/all', value)
      .map(res => res.json())
      .subscribe(result => {
        /*console.log(JSON.stringify(result));*/
        this.debtors = result['total_payments'];
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
