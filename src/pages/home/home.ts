import { Component, trigger, state, style, transition, animate} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { HttpClient } from '../../providers/http-client';
import { AppSettings } from '../../providers/app-settings';

import { DebtorPage } from '../debtor/debtor'
import { LoadingClient } from '../../providers/loading-client';
import { PendingPaymentPage } from '../pending-payment/pending-payment'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
export class HomePage {
	title_page = 'Inicio';
	pendingPayments: Array<any>;
	debts: Array<any>;
  notificationsCount: number;
  key_page: string = '/check-dashboard';

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    private http: HttpClient,
    private loading: LoadingClient,
    private app_settings: AppSettings,
    private storage: Storage) {

    storage.get(this.key_page).then(data => {
      loading.showLoading(data)
      if (data) {
        this.pendingPayments = data['pendingPayments'];
        this.debts = data['debts'];
        this.notificationsCount = data['notificationsCount'];
      }
      http.getRequest(this.key_page, this.loading.loading_page).subscribe(result => {
        this.pendingPayments = result['pendingPayments'];
        this.debts = result['debts'];
        this.notificationsCount = result['notificationsCount'];
        storage.set(this.key_page, result)
        loading.dismiss()
      }, error => loading.showError(error))
    });
  }

  private goToPendingPayment(){
  	this.navCtrl.setRoot(PendingPaymentPage);
  }

  private goToDebtor(){
  	this.navCtrl.setRoot(DebtorPage);
  }
}
