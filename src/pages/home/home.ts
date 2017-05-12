import { Component, trigger, state, style, transition, animate} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';
import { AppSettings } from '../../providers/app-settings';

import { DebtorPage } from '../debtor/debtor'
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

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    private http: HttpClient,
    private app_settings: AppSettings,
    private loading: LoadingClient,
    private storage: Storage) {

  	storage.get('token').then(value => {
      
  		loading.showLoading();
  		http.get('http://dptomanager.solunes.com/api/check-dashboard', value)
        .timeout(3000)
        .map(res => res.json())
        .subscribe(result => {
          console.log(JSON.stringify(result));
          this.pendingPayments = result['pendingPayments'];
          this.debts = result['debts'];
          this.notificationsCount = result['notificationsCount'];
          this.storage.set('notificationsCount', this.notificationsCount);
          loading.dismiss();
      }, error => {
        loading.dismiss();
        console.log("error " + error);
        /*  loading.loading.dismiss().then(() => {
            loading.showError(error);
          });*/
        });
  	});
    
  }

  private goToPendingPayment(){
  	this.navCtrl.setRoot(PendingPaymentPage);
  }

  private goToDebtor(){
  	this.navCtrl.setRoot(DebtorPage);
  }
}
