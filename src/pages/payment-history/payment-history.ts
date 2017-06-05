import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

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
  histories: Array<JSON> = new Array();
  notificationsCount: number;
  key_page: string = '/accounts/all/me/all';

  constructor(public http: HttpClient, 
        public navCtrl: NavController, 
        private storage: Storage,
        private loading: LoadingClient,
        public navParams: NavParams) {

    storage.get('notificationsCount').then(value => {
      this.notificationsCount = value;
    });

    storage.get(this.key_page).then(data => {
      loading.showLoading()
      let last_id = 0
      if (data) {
        this.histories = data
        last_id = http.getLastId(data);
      }
      http.getRequest(this.key_page, last_id).subscribe(result => {
        for (var i = 0; i < result['accounts'].length; i++) {
          this.histories.push(result['accounts'][i])
        }
        storage.set(this.key_page, this.histories);
        loading.dismiss()
      }, error => loading.dismiss())
    });
  }

}
