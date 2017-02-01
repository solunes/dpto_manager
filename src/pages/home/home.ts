import { Component} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { HttpClient } from '../../providers/http-client';
import { LoadingClient } from '../../providers/loading-client';

import { DebtorPage } from '../../pages/debtor/debtor'
import { PendingPaymentPage } from '../../pages/pending-payment/pending-payment'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	title_page = 'Inicio';
	pendingPayments: Array<any>;
	debts: Array<any>;

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    private http: HttpClient,
    private loading: LoadingClient,
    private storage: Storage) {

  	storage.get('token').then(value => {
      
  		loading.showLoading();
  		http.get('http://dptomanager.solunes.com/api/check-dashboard', value)
  			.map(res => res.json())
  			.subscribe(result => {
  				this.pendingPayments = result['pendingPayments'];
  				this.debts = result['debts'];
  				loading.dismiss();
  		}, error => {
  			loading.dismiss();
	  		console.log("error " + error);
	  		/*	loading.loading.dismiss().then(() => {
		  			loading.showError(error);
	  			});*/
	  		});
  	});
  }

  public goToPendingPayment(){
  	this.navCtrl.setRoot(PendingPaymentPage);
  }

  private goToDebtor(){
  	this.navCtrl.setRoot(DebtorPage);
  }
}
