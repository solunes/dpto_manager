import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	loading: Loading;
	registerCredentials = {email: '', password: ''};

	constructor(private nav: NavController, 
		private auth: AuthService, 
		private alertCtrl: AlertController, 
		private loadingCtrl: LoadingController, 
		private storage: Storage,
		private http: Http) {}

	public login(){
		this.showLoading();
		this.auth.login(this.registerCredentials).subscribe(allowed => {
			if (allowed) {
				setTimeout(() => {
					this.loading.dismiss();
					this.nav.setRoot(TabsPage);
					this.storage.set('login', true);
				});
			} else {
				this.showError("Access Denied");
			}
		}, error => {
			this.showError(error);
		});
	}

	showLoading(){
		this.loading = this.loadingCtrl.create({
			content: "Please wait..."
		});
		this.loading.present();
	}

	showError(text){
		setTimeout(() => {
			this.loading.dismiss();
		});
		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}

  	ionViewCanEnter(){
		this.storage.get('login').then((value) => {
	    	if(value) {
	    		this.nav.setRoot(TabsPage)
	    	}
	    });
  	}

}
