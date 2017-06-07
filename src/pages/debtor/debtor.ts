import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavParams } from 'ionic-angular';

import { LoadingClient } from '../../providers/loading-client';
import { HttpClient } from '../../providers/http-client';
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
  debtors: Array<JSON> = new Array();
  key_page:string = '/payment-details/total/apartment/pending/all/all';

  constructor(
    public http: HttpClient, 
    private storage: Storage,
    private loading: LoadingClient,
    public navParams: NavParams) {

    storage.get(this.key_page).then(data => {
      let last_id
      if (data) {
        this.debtors = data;
        last_id = http.getLastId(data)
      }
      loading.showLoading(last_id,)
      http.getRequest(this.key_page, this.loading.loading_page, last_id).subscribe(result => {
        for (var i = 0; i < result['total_payments'].length; i++) {
          this.debtors.push(result['total_payments'][i])
        }
        storage.set(this.key_page, this.debtors)
        loading.dismiss()
      }, error => loading.showError(error))
    });
    storage.get('notificationsCount').then(value => {
      this.notificationsCount = value;
    });
  }
}
